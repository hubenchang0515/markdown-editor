import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { render } from "./utils/markdown";
import { Emerald, PALETTE, Sky, Slate } from "./common/Color";
import Editor, {type EditorInstance} from "./components/Editor";
import Preview from "./components/Preview";
import Button from "./components/Button";
import debounce from "./utils/debounce";
import QrCodeDialog from "./dialogs/QrCodeDialog";
import { storeFile } from "./utils/db";
import type { Theme } from "./common/Theme";
import Select from "./components/Select";
import ColorPicker from "./components/ColorPicker";
import { DEFAULT_COLORS, THEME_PRESETS } from "./themes";

const THEME_OPTIONS = THEME_PRESETS.map((preset) => ({
    text: preset.name,
    value: preset.id
}));

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
    const [theme, setTheme] = useState('default');
    const [primaryColor, setPrimaryColor] = useState(DEFAULT_COLORS.primary);
    const [secondaryColor, setSecondaryColor] = useState(DEFAULT_COLORS.secondary);
    const [baseColor, setBaseColor] = useState(DEFAULT_COLORS.base);
    const [readonly, setReadonly] = useState(true);

    // 根据当前样式和配色生成主题
    const currentTheme = useMemo<Theme>(() => {
        const preset = THEME_PRESETS.find((item) => item.id === theme) ?? THEME_PRESETS[0];
        return preset.create(
            PALETTE[primaryColor],
            PALETTE[secondaryColor],
            PALETTE[baseColor]
        );
    }, [theme, primaryColor, secondaryColor, baseColor]);

    // 消抖
    const update = useCallback(debounce(setRaw, 10), [setRaw]);

    // 渲染
    useEffect(() => {
        render(raw, currentTheme).then(html => setHtml(html));
    }, [raw, currentTheme]);

    // 预览界面自动滚动
    const scrollToLine = useCallback((line:number) => {
        while (line > 0) {
            const target = iframeRef.current?.contentDocument?.querySelector(`.line-${line}`);
            if (target) {
                target?.scrollIntoView();
                break;
            }

            line -= 1;
        }
    }, [editor]);

    // 复制
    const copy = useCallback(() => {
        navigator.clipboard.write([
            new ClipboardItem({
                'text/plain': new Blob([html], {type: 'text/plain'}),
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
            storeFile(file).then(res => {
                const url = `IDB:${res.id}`;
                const text = `![${file.name}](${url})\n`
                editor?.focus();
                editor?.trigger('keyboard', 'type', {text: text});
                inputRef.current!.value = '';
            });
        };
        inputRef.current.click();
    }, [editor]);

    // 插入二维码
    const insertQrCode = useCallback((blob?:Blob|null) => {
        setOpenQrCodeDialog(false);
        if (!blob) return;
        const file = new File([blob], 'qrcode.png', {type:blob.type, lastModified: Date.now()});
        storeFile(file).then(res => {
            const url = `IDB:${res.id}`;
            const text = `![${file.name}](${url})\n`
            editor?.focus();
            editor?.trigger('keyboard', 'type', {text: text});
            inputRef.current!.value = '';
        })
    }, [editor]);

    // 粘贴图片
    useEffect(() => {
        const pasteImage = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (!file) continue;
                    storeFile(file).then(res => {
                        const url = `IDB:${res.id}`;
                        const text = `![${file.name}](${url})\n`
                        editor?.focus();
                        editor?.trigger('keyboard', 'type', {text: text});
                        inputRef.current!.value = '';
                    })
                }
            }
        }

        window.addEventListener('paste', pasteImage, true);
        return () => {
            window.removeEventListener('paste', pasteImage);
        }
    }, [editor]);

    // Ctrl + S：防手欠
    useEffect(() => {
        const handleKeyDown = (event:KeyboardEvent) => {
            const isCtrlPressed = event.ctrlKey || event.metaKey;
            if (isCtrlPressed && event.key === 's') {
                event.preventDefault();
                event.stopPropagation();
                render(raw, currentTheme).then(html => setHtml(html));
            }
        };

        
        window.addEventListener('keydown', handleKeyDown);
        iframeRef.current?.contentWindow?.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            iframeRef.current?.contentWindow?.removeEventListener('keydown', handleKeyDown);
        };
    }, [raw, currentTheme]);

    // 初始化
    useEffect(() => {
        let paramsString = ""
        if (window.location.hash) {
            paramsString = window.location.hash.substring(1)
        } else if (window.location.search) {
            paramsString = window.location.search;
        }

        const params = new URLSearchParams(paramsString);
        const base64md = params.get("content") ?? '';
        if (base64md) {
            setReadonly(true);
            setRaw(decodeURIComponent(atob(base64md)));
        } else {
            setReadonly(false);
        }

        // 支持通过链接分享样式与配色
        const themeId = params.get("theme");
        if (themeId && THEME_PRESETS.some((preset) => preset.id === themeId)) {
            setTheme(themeId);
        }

        const primary = params.get("primary");
        if (primary && PALETTE[primary]) setPrimaryColor(primary);

        const secondary = params.get("secondary");
        if (secondary && PALETTE[secondary]) setSecondaryColor(secondary);

        const base = params.get("base");
        if (base && PALETTE[base]) setBaseColor(base);
    }, []);

    return (
        <div
            style={{
                height: readonly ? 'auto' : '100%', 
                minHeight:'100%',
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
                    flexWrap:'wrap',
                    alignItems:'center',
                    gap:6,
                    width:'100%',
                    maxWidth:'calc(420mm + 8px)',
                    margin:'auto'
                }}
            >
                <input ref={inputRef} type="file" style={{display:'none'}}/>
                <QrCodeDialog open={openQrCodeDialog} onConfirm={insertQrCode} onCancel={()=>setOpenQrCodeDialog(false)}/>
                <div style={{display:readonly?'none':'block'}}>
                    <Button onClick={openFile}>打开</Button>
                    <Button onClick={saveFile}>保存</Button>
                </div>
                <div style={{display:readonly?'none':'block'}}>
                    <Button color={Emerald} onClick={insertImage}>图片</Button>
                    <Button color={Emerald} onClick={()=>setOpenQrCodeDialog(true)}>二维码</Button>
                </div>
                <div>
                    <Button color={Sky} onClick={copy}>复制</Button>
                    <Button color={Sky} onClick={()=>{iframeRef.current?.contentWindow?.print()}}>打印</Button>
                </div>
                <span style={{flex:1}}/>
                {
                    theme !== 'empty' &&
                    <div style={{display:'flex', alignItems:'center', gap:4}}>
                        <ColorPicker label="主色" value={primaryColor} onChange={setPrimaryColor}/>
                        <ColorPicker label="辅色" value={secondaryColor} onChange={setSecondaryColor}/>
                        <ColorPicker label="基础色" value={baseColor} onChange={setBaseColor}/>
                        <Button
                            title="恢复默认配色"
                            onClick={() => {
                                setPrimaryColor(DEFAULT_COLORS.primary);
                                setSecondaryColor(DEFAULT_COLORS.secondary);
                                setBaseColor(DEFAULT_COLORS.base);
                            }}
                        >
                            重置
                        </Button>
                    </div>
                }
                <Select value={theme} options={THEME_OPTIONS} onSelect={(value) => setTheme(value)}/>
            </nav> 
            <main
                ref={containerRef}
                className="container"
                style={{
                    flex:1, 
                    display:'flex', 
                    flexDirection: width > 960 ? 'row' : 'column',
                    gap:8, 
                    overflow: readonly ? 'visible' : 'hidden',
                    width:'100%',
                    maxWidth:'calc(420mm + 8px)',
                    margin:'auto'
                }}
            >
                {
                    readonly ? <></> :
                    <Editor
                        id="editor"
                        ref={editorRef}
                        className="no-print" 
                        style={{
                            flex:1, 
                            minWidth: 0,
                            minHeight: 0,
                            border: `1px solid ${Slate._200}`,
                            maxWidth: '210mm',
                            display: readonly ? 'none' : 'block'
                        }}
                        onInit={(instance) => setEditor(instance)}
                        onEdit={(text) => update(text)}
                        onMove={scrollToLine}
                    />
                }
                
                <Preview
                    id="preview"
                    ref={iframeRef}
                    className="print-root" 
                    autoHeight={readonly}
                    style={{
                        flex: readonly ? 'none' : 1, 
                        width: readonly ? '100%' : undefined,
                        boxSizing: 'border-box',
                        minWidth: 0,
                        minHeight: 0,
                        background:'#fff', 
                        overflow: readonly ? 'visible' : 'auto', 
                        border: `1px solid ${Slate._200}`,
                        overflowX:'hidden',
                        // 限制预览宽度，保持阅读行宽（不再依赖主题的页面级样式）
                        maxWidth: '210mm',
                        // 四周留出一点间距，避免内容贴边
                        margin: readonly ? 'auto' : '0',
                        padding: '8px'
                    }} 
                    content={html}
                    onUpdate={() => scrollToLine(editor?.getPosition()?.lineNumber??0)}
                />
            </main>
        </div>
    )
}

export default App
