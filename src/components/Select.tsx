import { css } from "@emotion/react";
import { Slate } from "../common/Color";

export interface SelectOption {
    text: string;
    value?: string;
}

export interface SelectProps {
    value: any;
    options: SelectOption[];
    onSelect: (value:any) => void;
}

export default function Select(props:SelectProps) {
    return (
        <select 
            value={props.value} 
            onChange={(ev) => props.onSelect(ev.target.value)}
            css={css({
                color: Slate._50,
                backgroundColor: Slate._500,
                padding: '2px 4px',
                border: `1px solid ${Slate._500}`,
                margin: 0,
                userSelect: 'none',
                cursor: 'pointer',
                outline: 'none',
            })}
        >
            {
                props.options.map((item, i) => {
                    return (
                        <option key={i} value={item.value??i}>
                            {
                                item.text
                            }
                        </option>
                    )
                })
            }
        </select>
    )
}