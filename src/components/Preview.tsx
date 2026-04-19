import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Slate } from "../common/Color";

export interface PreviewProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    content?: string;
    onUpdate?: ()=>void;
}

const ALT_HTML = `<div style="position:fixed;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;font-size:2rem;color:${Slate._300};user-select:none">预览区域</div>`;

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>((props, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    useEffect(() => {
        iframeRef.current!.contentDocument!.body.innerHTML! = props.content || ALT_HTML;
        props.onUpdate?.();
    }, [props.content, props.onUpdate]);
    
    const {content, onUpdate, ...rawProps} = props;
    return (
        <iframe
            ref={setRef}
            {...rawProps}
        />
    );
})

export default Preview;