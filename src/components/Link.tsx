import { forwardRef } from "react";
import { Slate, type Color } from "../common/Color";
import { css } from '@emotion/react';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
    color?: Color;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const {color, ...rawProps} = props;
    return (
        <a 
            ref={ref}
            css={css({
                color: (props.color??Slate)._500,
                textDecoration: 'none',
                cursor: 'pointer',

                "&:hover": {
                    textDecoration: 'underline',
                },

            })}
            {...rawProps}
        >
            {props.children}
        </a>
    )
})

export default Link;