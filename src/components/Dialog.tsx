import { forwardRef, useCallback, useEffect, useRef } from "react";

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {

}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const setRef = useCallback((element:HTMLDialogElement) => {
        dialogRef.current = element;
        if (ref) {
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        }
    }, [ref]);

    useEffect(() => {
        if (props.open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [props.open]);

    const {open, ...rawProps} = props;
    return (
        <dialog
            ref={setRef}
            {...rawProps}
        >
            {props.children}
        </dialog>
    )
});

export default Dialog;