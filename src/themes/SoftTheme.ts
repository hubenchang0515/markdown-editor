import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SANS } from "./fonts";

/**
 * 清新样式：胶囊标题、柔和圆角与悬浮卡片
 */
export function CreateSoftTheme(primary: Color, secondary: Color, base: Color): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SANS,
        fontSize: "16px",
        lineHeight: "1.8",
        color: base._800,
    };

    return {
        h1: {
            ...text,
            margin: "8px 0 28px",
            fontSize: "2.25rem",
            fontWeight: "800",
            textAlign: "center",
            letterSpacing: "-0.01em",
            color: primary._600,
        },

        h2: {
            ...text,
            margin: "36px 0 16px",
            padding: "8px 16px",
            fontSize: "1.375rem",
            fontWeight: "700",
            color: primary._700,
            background: `linear-gradient(90deg, ${primary._100}, ${secondary._100})`,
            borderRadius: 10,
            boxShadow: `0 2px 0 ${primary._200}`,
        },

        h3: {
            ...text,
            margin: "28px 0 12px",
            paddingLeft: 10,
            fontSize: "1.2rem",
            fontWeight: "700",
            color: primary._700,
            borderLeft: `4px solid ${secondary._400}`,
        },

        h4: {
            ...text,
            margin: "22px 0 10px",
            fontSize: "1.0625rem",
            fontWeight: "700",
            color: primary._700,
        },

        h5: {
            ...text,
            margin: "20px 0 8px",
            fontSize: "1rem",
            fontWeight: "700",
            color: primary._700,
        },

        h6: {
            ...text,
            margin: "18px 0 8px",
            fontSize: "0.875rem",
            fontWeight: "700",
            color: primary._600,
        },

        p: {
            ...text,
            margin: "0 0 16px",
        },

        strong: {
            fontWeight: "700",
            color: primary._700,
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
            borderRadius: 14,
            boxShadow: `0 12px 32px -12px ${base._400}`,
        },

        blockquote: {
            ...text,
            margin: "24px 0",
            padding: "16px 20px",
            background: secondary._50,
            borderLeft: `4px solid ${secondary._300}`,
            borderRadius: "0 12px 12px 0",
            color: base._700,
            boxShadow: `0 4px 16px -12px ${secondary._400}`,
        },

        a: {
            padding: "0 2px",
            color: primary._600,
            background: primary._50,
            borderRadius: 3,
            textDecoration: "none",
            borderBottom: `1px solid ${primary._300}`,
        },

        code: {
            padding: "2px 6px",
            borderRadius: 6,
            background: secondary._100,
            color: secondary._700,
            fontFamily: MONO,
            fontSize: "0.875em",
        },

        pre: {
            ...text,
            margin: "24px 0",
            padding: 20,
            background: "#ffffff",
            border: `1px solid ${base._200}`,
            borderRadius: 14,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.7",
            boxShadow: `0 12px 32px -20px ${base._500}`,
        },

        table: {
            margin: "24px 0",
            width: "100%",
            background: "#ffffff",
            border: `1px solid ${base._200}`,
            borderCollapse: "separate",
            borderSpacing: 0,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: `0 12px 32px -24px ${base._500}`,
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
            margin: "6px 0",
        },

        hr: {
            margin: "32px 0",
            border: "none",
            borderTop: `2px dashed ${secondary._200}`,
        },

        linenumber: {
            margin: "4px 8px",
            padding: "16px 8px",
            color: base._400,
            borderRight: `1px solid ${base._200}`,
        },
    };
}
