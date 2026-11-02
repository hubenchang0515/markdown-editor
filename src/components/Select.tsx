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
    dark?: boolean;
}

export default function Select(props:SelectProps) {
    // 原生下拉列表不继承 select 的文字颜色，需要单独设置
    const optionColors = props.dark
        ? { color: Slate._50, backgroundColor: Slate._800 }
        : { color: Slate._800, backgroundColor: Slate._50 };

    return (
        <select 
            value={props.value} 
            onChange={(ev) => props.onSelect(ev.target.value)}
            css={css({
                color: Slate._50,
                backgroundColor: Slate._500,
                colorScheme: props.dark ? 'dark' : 'light',
                padding: '2px 4px',
                border: `1px solid ${Slate._500}`,
                // 与普通按钮保持一致的高度
                height: 25,
                boxSizing: 'border-box',
                margin: 0,
                userSelect: 'none',
                cursor: 'pointer',
                outline: 'none',

                "& option": optionColors,
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