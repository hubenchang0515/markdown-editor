import { forwardRef } from "react";
import { Slate, type Color } from "../common/Color";
import { css } from '@emotion/react';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    color?: Color;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {color, ...rawProps} = props;
    return (
        <button 
            ref={ref}
            css={css({
                color: (props.color??Slate)._50,
                backgroundColor: (props.color??Slate)._500,
                border: `1px solid ${(props.color??Slate)._500}`,
                userSelect: 'none',
                padding: '2px 4px',
                cursor: 'pointer',
                outline: 'none',

                "&:hover": {
                    backgroundColor: (props.color??Slate)._400,
                    border: `1px solid ${(props.color??Slate)._400}`,
                    boxShadow: `
                        4px 4px 6px -1px rgba(0, 0, 0, 0.1), 
                        2px 2px 4px -1px rgba(0, 0, 0, 0.06);
                    `,
                },

                "&:active": {
                    backgroundColor: (props.color??Slate)._500,
                    border: `1px solid ${(props.color??Slate)._500}`,
                    boxShadow: 'none',
                },
            })}
            {...rawProps}
        >
            {props.children}
        </button>
    )
})

export default Button;