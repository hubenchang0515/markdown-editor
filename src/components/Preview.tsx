import { forwardRef } from "react";
import { Slate } from "../common/Color";

export interface PreviewProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {

}

const ALT_HTML = `<div style="position:fixed;top:0;left:0;bottom:0;right:0;display:flex;justify-content:center;align-items:center;font-size:2rem;color:${Slate._300};user-select:none">预览区域</div>`;

const Preview = forwardRef<HTMLIFrameElement, PreviewProps>((props, ref) => {
    return (
        <iframe
            ref={ref}
            className={props.className}
            style={props.style}
            srcDoc={props.srcDoc || ALT_HTML}
        />
    );
})

export default Preview;