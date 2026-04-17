import { useCallback, useEffect, useRef, useState } from "react";
import { render } from "./utils/markdown";
import DefaultTheme from "./themes/DefaultTheme";
import { Emerald, Sky, Slate } from "./common/Color";
import Editor, {type EditorInstance} from "./components/Editor";
import Preview from "./components/Preview";
import Button from "./components/Button";
import debounce from "./utils/debounce";
import QrCodeDialog from "./dialogs/QrCodeDialog";

function App() {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [width, setWidth] = useState(window.innerWidth);
    const [raw, setRaw] = useState("");
    const [html, setHtml] = useState("");
    const [editor, setEditor] = useState<EditorInstance|null>(null);
    const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);

    // 消抖
    const update = useCallback(debounce(setRaw, 10), [setRaw]);

    // 渲染
    useEffect(() => {
        render(raw, DefaultTheme).then(html => setHtml(html));
    }, [raw]);

    // 预览界面自动滚动
    const scrollToLine = useCallback((line:number) => {
        const target = iframeRef.current?.contentDocument?.querySelector(`.line-${line}`);
        target?.scrollIntoView();        
    }, [editor]);

    // 复制
    const copy = useCallback(() => {
        navigator.clipboard.write([
            new ClipboardItem({
                'text/plain': new Blob([raw], {type: 'text/plain'}),
                'text/html': new Blob([html], {type: 'text/html'})
            })
        ]);
    }, [html]);

    // 监听容器宽度
    useEffect(() => {

        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        observer.observe(containerRef.current!);

        return () => {
            observer.disconnect();
        }
    }, []);

    // 打开文件
    const openFile = useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.accept = "*";
        inputRef.current.onchange = () => {
            const file = inputRef.current!.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                editor?.focus();
                editor?.setValue(reader.result as string);
            }
            reader.readAsText(file);
            inputRef.current!.value = '';
        };
        inputRef.current.click();
    }, [editor]);

    // 保存文件
    const saveFile = useCallback(() => {
        const blob = new Blob([raw], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.href = url;
        link.download = 'file.md';
        document.body.appendChild(link);
        link.click();
        
        // 清理
        URL.revokeObjectURL(url);
    }, [raw]);

    // 插入图片
    const insertImage = useCallback(() => {
        if (!inputRef.current) return;
        inputRef.current.accept = "image/*";
        inputRef.current.onchange = () => {
            const file = inputRef.current!.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            const text = `![${file.name}](${url})`
            editor?.focus();
            editor?.trigger('keyboard', 'type', {text: text});
            inputRef.current!.value = '';
        };
        inputRef.current.click();
    }, [editor]);

    // 插入二维码
    const insertQrCode = useCallback((url:string) => {
        setOpenQrCodeDialog(false);
        const text = `![qrcode](${url})`
        editor?.focus();
        editor?.trigger('keyboard', 'type', {text: text});
    }, [editor]);

    return (
        <div
            style={{
                height:'100%', 
                width:'100%', 
                display:'flex', 
                flexDirection:'column', 
                background: Slate._100, 
                padding:8, 
                gap:8, 
                boxSizing:'border-box'
            }}
        >
            <nav 
                className="no-print" 
                style={{
                    display:'flex', 
                    gap:6,
                    width:'100%',
                    maxWidth:'calc(420mm + 8px)',
                    margin:'auto'
                }}
            >
                <input ref={inputRef} type="file" style={{display:'none'}}/>
                <QrCodeDialog open={openQrCodeDialog} onConfirm={insertQrCode} onCancel={()=>setOpenQrCodeDialog(false)}/>
                <div>
                    <Button onClick={openFile}>打开</Button>
                    <Button onClick={saveFile}>保存</Button>
                </div>
                <div>
                    <Button color={Emerald} onClick={insertImage}>图片</Button>
                    <Button color={Emerald} onClick={()=>setOpenQrCodeDialog(true)}>二维码</Button>
                </div>
                <div>
                    <Button color={Sky} onClick={copy}>复制</Button>
                    <Button color={Sky} onClick={()=>{iframeRef.current?.contentWindow?.print()}}>打印</Button>
                </div>
                <span style={{flex:1}}/>
            </nav> 
            <main
                ref={containerRef}
                className="container"
                style={{
                    flex:1, 
                    display:'flex', 
                    flexDirection: width > 960 ? 'row' : 'column',
                    gap:8, 
                    overflow:'hidden',
                    width:'100%',
                    maxWidth:'calc(420mm + 8px)',
                    margin:'auto'
                }}
            >
                <Editor
                    id="editor"
                    ref={editorRef}
                    className="no-print" 
                    style={{
                        flex:1, 
                        minWidth: 0,
                        minHeight: 0,
                        border: `1px solid ${Slate._200}`,
                        maxWidth: '210mm'
                    }}
                    onInit={(instance) => setEditor(instance)}
                    onEdit={(text) => update(text)}
                    onMove={scrollToLine}
                />
                <Preview
                    id="preview"
                    ref={iframeRef}
                    className="print-root" 
                    style={{
                        flex:1, 
                        minWidth: 0,
                        minHeight: 0,
                        background:'#fff', 
                        overflow:'auto', 
                        border: `1px solid ${Slate._200}`,
                        overflowX:'hidden',
                        maxWidth: '210mm'
                    }} 
                    srcDoc={html}
                    onLoad={() => scrollToLine(editor?.getPosition()?.lineNumber??0)}
                />
            </main>
        </div>
    )
}

export default App
