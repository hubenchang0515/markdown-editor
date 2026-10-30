import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { PALETTE, Slate, type Color } from "../common/Color";

export interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const SHADES: (keyof Color)[] = [
    "_50", "_100", "_200", "_300", "_400", "_500",
    "_600", "_700", "_800", "_900", "_950",
];

export default function ColorPicker(props: ColorPickerProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [panel, setPanel] = useState({ top: 0, left: 0, width: 320, maxHeight: 360 });
    const color = PALETTE[props.value] ?? Slate;

    // 根据按钮位置计算面板位置，避免超出窗口
    const toggle = () => {
        if (open) {
            setOpen(false);
            return;
        }

        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;

        const width = Math.min(320, window.innerWidth - 16);
        setPanel({
            top: rect.bottom + 4,
            left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
            width,
            maxHeight: Math.max(160, Math.min(360, window.innerHeight - rect.bottom - 12)),
        });
        setOpen(true);
    };

    // 点击外部或按下 Esc 关闭面板
    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <button
                ref={buttonRef}
                type="button"
                title={`选择${props.label}`}
                aria-label={`选择${props.label}`}
                aria-expanded={open}
                onClick={toggle}
                css={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 4px',
                    color: Slate._50,
                    backgroundColor: Slate._500,
                    border: `1px solid ${Slate._500}`,
                    cursor: 'pointer',
                    outline: 'none',
                    userSelect: 'none',

                    "&:hover": {
                        backgroundColor: Slate._400,
                        border: `1px solid ${Slate._400}`,
                    },
                })}
            >
                <span>{props.label}</span>
                <span
                    style={{
                        display: 'flex',
                        width: 56,
                        height: 12,
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    {SHADES.map((shade) => (
                        <span key={shade} style={{ flex: 1, background: color[shade] }}/>
                    ))}
                </span>
                <span style={{ fontSize: 12 }}>{props.value}</span>
                <span style={{ fontSize: 10, opacity: 0.8 }}>▾</span>
            </button>
            {
                open &&
                <div
                    role="listbox"
                    aria-label={`${props.label}配色`}
                    css={css({
                        position: 'fixed',
                        top: panel.top,
                        left: panel.left,
                        zIndex: 100,
                        width: panel.width,
                        maxHeight: panel.maxHeight,
                        overflowY: 'auto',
                        padding: 4,
                        backgroundColor: '#fff',
                        border: `1px solid ${Slate._300}`,
                        borderRadius: 4,
                        boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.25)',
                    })}
                >
                    {
                        Object.entries(PALETTE).map(([name, palette]) => {
                            const selected = name === props.value;
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    role="option"
                                    aria-selected={selected}
                                    title={name}
                                    onClick={() => {
                                        props.onChange(name);
                                        setOpen(false);
                                    }}
                                    css={css({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        width: '100%',
                                        padding: '3px 4px',
                                        border: 'none',
                                        borderRadius: 2,
                                        background: selected ? Slate._100 : 'transparent',
                                        outline: selected ? `2px solid ${Slate._500}` : 'none',
                                        outlineOffset: -2,
                                        cursor: 'pointer',
                                        textAlign: 'left',

                                        "&:hover": {
                                            background: Slate._100,
                                        },
                                    })}
                                >
                                    <span
                                        style={{
                                            flex: '0 0 52px',
                                            fontSize: 12,
                                            color: Slate._700,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {name}
                                    </span>
                                    <span style={{ display: 'flex', flex: 1, gap: 1 }}>
                                        {SHADES.map((shade) => (
                                            <span
                                                key={shade}
                                                style={{
                                                    flex: 1,
                                                    height: 16,
                                                    background: palette[shade],
                                                }}
                                            />
                                        ))}
                                    </span>
                                </button>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}
