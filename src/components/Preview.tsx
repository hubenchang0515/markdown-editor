import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Slate } from "../common/Color";

export interface PreviewProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    content?: string;
    onUpdate?: ()=>void;
    autoHeight?: boolean;
}

const ALT_HTML = `<div style="position:fixed;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;font-size:2rem;color:${Slate._300};user-select:none">预览区域</div>`;

const CONTENT_ID = 'preview-content';

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>((props, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const observerRef = useRef<ResizeObserver|null>(null);

    const setRef = useCallback((element:HTMLIFrameElement) => {
        iframeRef.current = element;
        if (ref) {
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        }
    }, [ref]);

    // 高度跟随内容，使外层页面（body）滚动
    const resize = useCallback(() => {
        const iframe = iframeRef.current;
        const doc = iframe?.contentDocument;
        const content = doc?.getElementById(CONTENT_ID);
        if (!iframe || !doc || !content) return;

        const style = doc.defaultView?.getComputedStyle(doc.body);
        const marginTop = parseFloat(style?.marginTop ?? '0') || 0;
        const marginBottom = parseFloat(style?.marginBottom ?? '0') || 0;
        const contentHeight = content.getBoundingClientRect().height + marginTop + marginBottom;

        // 短内容时撑满一屏；减去页面底部留白，避免产生多余的滚动
        const top = iframe.getBoundingClientRect().top + window.scrollY;
        const page = iframe.parentElement?.parentElement;
        const paddingBottom = page ? parseFloat(getComputedStyle(page).paddingBottom) || 0 : 0;
        const height = Math.max(contentHeight, document.documentElement.clientHeight - top - paddingBottom);

        iframe.style.height = `${Math.ceil(height)}px`;
    }, []);

    useEffect(() => {
        const doc = iframeRef.current!.contentDocument!;
        doc.body.innerHTML = `<div id="${CONTENT_ID}">${props.content || ALT_HTML}</div>`;

        observerRef.current?.disconnect();
        observerRef.current = null;

        if (props.autoHeight) {
            const content = doc.getElementById(CONTENT_ID);
            if (content) {
                observerRef.current = new ResizeObserver(resize);
                observerRef.current.observe(content);
            }
            resize();
        }

        props.onUpdate?.();
    }, [props.content, props.onUpdate, props.autoHeight, resize]);

    // 窗口尺寸变化时重新计算高度
    useEffect(() => {
        if (!props.autoHeight) return;
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, [props.autoHeight, resize]);

    const {content, onUpdate, autoHeight, ...rawProps} = props;
    return (
        <iframe
            ref={setRef}
            scrolling={autoHeight ? 'no' : undefined}
            {...rawProps}
        />
    );
})

export default Preview;
