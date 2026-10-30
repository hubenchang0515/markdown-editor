import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SANS } from "./fonts";

/**
 * 简约样式：极简排版，大号细标题、单色文字与锐利分隔线
 */
export function CreateMinimalTheme(primary: Color, secondary: Color, base: Color): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SANS,
        fontSize: "16px",
        lineHeight: "1.8",
        color: base._600,
    };

    return {
        h1: {
            ...text,
            margin: "0 0 40px",
            fontSize: "3rem",
            fontWeight: "300",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            color: base._900,
        },

        h2: {
            ...text,
            margin: "48px 0 16px",
            paddingBottom: 12,
            fontSize: "1.375rem",
            fontWeight: "600",
            color: base._900,
            borderBottom: `2px solid ${primary._500}`,
        },

        h3: {
            ...text,
            margin: "32px 0 12px",
            fontSize: "1.125rem",
            fontWeight: "600",
            letterSpacing: "0.02em",
            color: base._700,
        },

        h4: {
            ...text,
            margin: "24px 0 8px",
            fontSize: "1rem",
            fontWeight: "600",
            color: base._700,
        },

        h5: {
            ...text,
            margin: "20px 0 8px",
            fontSize: "0.9375rem",
            fontWeight: "600",
            letterSpacing: "0.08em",
            color: base._600,
        },

        h6: {
            ...text,
            margin: "18px 0 8px",
            fontSize: "0.8125rem",
            fontWeight: "600",
            letterSpacing: "0.12em",
            color: base._500,
        },

        p: {
            ...text,
            margin: "0 0 20px",
            lineHeight: "1.9",
        },

        strong: {
            fontWeight: "600",
            color: base._900,
        },

        em: {
            fontStyle: "italic",
        },

        del: {
            color: base._400,
            textDecoration: `line-through ${base._400}`,
        },

        img: {
            display: "block",
            margin: "32px auto",
            maxWidth: "100%",
        },

        blockquote: {
            ...text,
            margin: "28px 0",
            padding: "2px 0 2px 24px",
            borderLeft: `2px solid ${primary._500}`,
            fontStyle: "italic",
            color: base._500,
        },

        a: {
            color: base._900,
            textDecoration: "none",
            borderBottom: `1px solid ${base._400}`,
        },

        code: {
            padding: "1px 5px",
            borderRadius: 2,
            background: base._100,
            color: secondary._700,
            fontFamily: MONO,
            fontSize: "0.875em",
        },

        pre: {
            ...text,
            margin: "24px 0",
            padding: "20px 24px",
            background: base._50,
            border: `1px solid ${base._200}`,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.7",
        },

        table: {
            margin: "24px 0",
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9375rem",
        },

        th: {
            ...text,
            padding: "10px 0",
            textAlign: "left",
            fontWeight: "500",
            fontSize: "0.9375rem",
            letterSpacing: "0.05em",
            color: base._500,
            borderBottom: `1px solid ${base._300}`,
        },

        td: {
            ...text,
            padding: "10px 12px",
            fontSize: "0.9375rem",
            color: base._700,
            borderBottom: `1px solid ${base._100}`,
        },

        ol: {
            margin: "0 0 20px",
            paddingLeft: "1.5em",
        },

        ul: {
            margin: "0 0 20px",
            paddingLeft: "1.5em",
        },

        li: {
            ...text,
            margin: "6px 0",
        },

        hr: {
            margin: "40px 0",
            border: "none",
            borderTop: `1px solid ${base._200}`,
        },

        linenumber: {
            margin: "4px 8px",
            padding: "16px 8px",
            color: base._400,
            borderRight: `1px solid ${base._200}`,
        },
    };
}
