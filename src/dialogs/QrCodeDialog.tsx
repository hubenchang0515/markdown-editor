import { forwardRef, useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import QRCode from 'qrcode';
import Button from "../components/Button";
import { Blue } from "../common/Color";

export interface QrCodeDialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
    onConfirm?: (url:string)=>void;
    onCancel?: ()=>void;
}

const QrCodeDialog = forwardRef<HTMLDialogElement, QrCodeDialogProps>((props, ref) => {
    const [text, setText] = useState("");
    const [url, setUrl] = useState("");

    // 开关窗口时清空内容
    useEffect(() => {
        setText("");
    }, [props.open]);

    // 生成二维码
    useEffect(() => {
        QRCode.toCanvas(text||'https://xplanc.org/', (_, canvas) => {
            canvas.toBlob((blob) => {
                setUrl(URL.createObjectURL(blob!));
            })
        })
    }, [text]);

    const {onConfirm, onCancel, ...rawProps} = props;
    return (
        <Dialog
            ref={ref}
            {...rawProps}
        >
            <div
                style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:8,
                }}
            >
                <h2>插入二维码</h2>
                {
                    url && 
                    <img
                        src={url}
                        style={{
                            width:256, 
                            height:256,
                            margin:'auto'
                        }}
                    />
                }
                <textarea
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="二维码内容"
                    style={{
                        height: '5em',
                        width: '20em',
                        resize:'none',
                    }}
                    value={text}
                    onChange={(ev)=>setText(ev.target.value)}
                />
                <div
                    style={{
                        display: 'flex',
                        gap: 8,
                    }}
                >
                    <Button color={Blue} style={{flex:1}} onClick={()=>props.onConfirm?.(url)}>确定</Button>
                    <Button style={{flex:1}} onClick={props.onCancel}>取消</Button>
                </div>
            </div>
        </Dialog>
    )
});

export default QrCodeDialog;