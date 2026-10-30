import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SANS } from "./fonts";

/**
 * 卡片样式：标题、代码、引用和表格都以卡片呈现
 */
export function CreateCardTheme(primary: Color, secondary: Color, base: Color): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SANS,
        fontSize: "16px",
        lineHeight: "1.75",
        color: base._700,
    };

    return {
        h1: {
            ...text,
            margin: "0 0 24px",
            padding: "32px 24px",
            fontSize: "2rem",
            fontWeight: "800",
            textAlign: "center",
            color: primary._600,
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: `0 10px 30px -18px ${base._500}`,
        },

        h2: {
            ...text,
            margin: "24px 0 16px",
            padding: "10px 16px",
            fontSize: "1.375rem",
            fontWeight: "700",
            color: primary._700,
            background: "#ffffff",
            borderLeft: `5px solid ${primary._500}`,
            borderRadius: 10,
            boxShadow: `0 8px 24px -18px ${base._500}`,
        },

        h3: {
            ...text,
            margin: "24px 0 12px",
            paddingLeft: 12,
            fontSize: "1.15rem",
            fontWeight: "700",
            color: base._900,
            borderLeft: `5px solid ${secondary._400}`,
        },

        h4: {
            ...text,
            margin: "20px 0 8px",
            fontSize: "1.0625rem",
            fontWeight: "700",
            color: base._900,
        },

        h5: {
            ...text,
            margin: "18px 0 8px",
            fontSize: "1rem",
            fontWeight: "700",
            color: base._800,
        },

        h6: {
            ...text,
            margin: "16px 0 8px",
            fontSize: "0.875rem",
            fontWeight: "700",
            color: base._600,
        },

        p: {
            ...text,
            margin: "0 0 16px",
        },

        strong: {
            fontWeight: "700",
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
            margin: "24px auto",
            maxWidth: "100%",
            borderRadius: 12,
            boxShadow: `0 12px 32px -16px ${base._500}`,
        },

        blockquote: {
            ...text,
            margin: "20px 0",
            padding: "16px 20px",
            background: "#ffffff",
            borderLeft: `5px solid ${secondary._400}`,
            borderRadius: 12,
            color: base._700,
            boxShadow: `0 8px 24px -20px ${base._500}`,
        },

        a: {
            color: primary._600,
            textDecoration: "none",
            borderBottom: `1px solid ${primary._300}`,
        },

        code: {
            padding: "2px 6px",
            borderRadius: 6,
            background: base._100,
            color: secondary._700,
            fontFamily: MONO,
            fontSize: "0.875em",
        },

        pre: {
            ...text,
            margin: "20px 0",
            padding: 20,
            background: base._50,
            color: base._800,
            border: `1px solid ${base._200}`,
            borderRadius: 14,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.7",
            boxShadow: `0 16px 36px -24px ${base._500}`,
        },

        table: {
            margin: "20px 0",
            width: "100%",
            background: "#ffffff",
            borderCollapse: "separate",
            borderSpacing: 0,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: `0 10px 30px -22px ${base._500}`,
        },

        th: {
            ...text,
            padding: "10px 14px",
            textAlign: "left",
            fontWeight: "700",
            color: primary._700,
            background: primary._50,
            borderBottom: `1px solid ${base._200}`,
        },

        td: {
            ...text,
            padding: "10px 14px",
            borderBottom: `1px solid ${base._100}`,
        },

        ol: {
            margin: "0 0 16px",
            paddingLeft: "1.6em",
        },

        ul: {
            margin: "0 0 16px",
            paddingLeft: "1.6em",
        },

        li: {
            ...text,
            margin: "4px 0",
        },

        hr: {
            margin: "24px 0",
            border: "none",
            borderTop: `1px solid ${base._300}`,
        },

        linenumber: {
            margin: "4px 8px",
            padding: "16px 8px",
            color: base._400,
            borderRight: `1px solid ${base._300}`,
        },
    };
}
