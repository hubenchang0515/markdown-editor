import { forwardRef, useCallback, useEffect, useRef } from "react";
import * as monaco from 'monaco-editor';

export type EditorInstance = monaco.editor.IStandaloneCodeEditor;

export interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {
    onInit?: (editor: EditorInstance) => void;
    onEdit?: (text:string) => void;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);

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
        // 创建编辑器
        editorRef.current!.innerHTML = "";
        const editor = monaco.editor.create(editorRef.current!, {
            language: 'markdown',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            quickSuggestions: true,
        });

        // 监听内容变化
        const disposable = editor.onDidChangeModelContent(() => {
            props.onEdit?.(editor.getValue())
        });

        props.onInit?.(editor);

        return () => {
            disposable.dispose();
            editor.dispose();
        }
    }, []);

    const {onInit, onEdit, ...rawProps} = props;
    return (
        <div 
            ref={setRef}
            {...rawProps}
        />
    );
})

export default Editor;