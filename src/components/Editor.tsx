import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import * as monaco from 'monaco-editor';

export type EditorInstance = monaco.editor.IStandaloneCodeEditor;

export interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {
    onInit?: (editor: EditorInstance) => void;
    onEdit?: (text:string) => void;
    onMove?: (line:number) => void;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [editor, setEditor] = useState<EditorInstance|null>(null);

    const setRef = useCallback((element:HTMLDivElement) => {
        editorRef.current = element;
        if (ref) {
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        }
    }, [ref]);

    // 初始化
    useEffect(() => {
        console.log('初始化')
        // 创建编辑器
        editorRef.current!.innerHTML = "";
        const editor = monaco.editor.create(editorRef.current!, {
            language: 'markdown',
            automaticLayout: true,
            scrollBeyondLastLine: true,
            quickSuggestions: true,
        });

        setEditor(editor);;

        return () => {
            editor.dispose();
        }
    }, []);

    // 返回实例
    useEffect(() => {
        if (!editor) return;     
        props.onInit?.(editor);
    }, [props.onInit, editor]);

    // 监听内容变化
    useEffect(() => {
        if (!editor) return;  

        const disposable = editor.onDidChangeModelContent(() => {
            props.onEdit?.(editor.getValue())
        });

        return () => {
            disposable.dispose();
        }
    }, [props.onEdit, editor]);

    // 监听滚动
    useEffect(() => {
        if (!editor) return;  

        const disposable = editor.onDidScrollChange(() => {
            props.onMove?.(editor?.getVisibleRanges()[0].startLineNumber ?? 0);
        });
        
        return () => {
            disposable.dispose();
        }
    }, [props.onMove, editor])

    const {onInit, onEdit, onMove, ...rawProps} = props;
    return (
        <div 
            ref={setRef}
            {...rawProps}
        />
    );
})

export default Editor;