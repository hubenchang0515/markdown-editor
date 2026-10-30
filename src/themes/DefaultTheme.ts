import { Green, Pink, Slate, type Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SANS } from "./fonts";

export function CreateDefaultTheme(primary: Color, secondary: Color, base: Color = Slate): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SANS,
        fontSize: "16px",
        lineHeight: "1.75",
        color: base._800,
    };

    return {
        h1: {
            ...text,
            margin: "8px 0 28px",
            paddingBottom: 12,
            fontSize: "2rem",
            fontWeight: "800",
            textAlign: "center",
            letterSpacing: "0.02em",
            color: primary._600,
            borderBottom: `2px solid ${primary._100}`,
        },

        h2: {
            ...text,
            margin: "32px 0 16px",
            paddingLeft: 10,
            fontSize: "1.5rem",
            fontWeight: "700",
            color: primary._600,
            borderLeft: `4px solid ${primary._500}`,
        },

        h3: {
            ...text,
            margin: "24px 0 12px",
            fontSize: "1.25rem",
            fontWeight: "700",
            color: primary._700,
        },

        h4: {
            ...text,
            margin: "20px 0 8px",
            fontSize: "1.125rem",
            fontWeight: "700",
            color: base._900,
        },

        h5: {
            ...text,
            margin: "18px 0 8px",
            fontSize: "1rem",
            fontWeight: "700",
            color: base._900,
        },

        h6: {
            ...text,
            margin: "16px 0 8px",
            fontSize: "0.875rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            color: base._500,
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
            borderRadius: 8,
            boxShadow: `0 8px 24px -12px ${base._400}`,
        },

        blockquote: {
            ...text,
            margin: "20px 0",
            padding: "12px 18px",
            background: primary._50,
            borderLeft: `4px solid ${primary._400}`,
            borderRadius: "0 8px 8px 0",
            color: base._700,
        },

        a: {
            color: primary._600,
            textDecoration: "none",
            borderBottom: `1px solid ${primary._300}`,
        },

        code: {
            padding: "2px 6px",
            borderRadius: 4,
            background: secondary._50,
            color: secondary._700,
            fontFamily: MONO,
            fontSize: "0.875em",
        },

        pre: {
            ...text,
            margin: "20px 0",
            padding: "18px 20px",
            background: base._50,
            color: base._800,
            border: `1px solid ${base._200}`,
            borderRadius: 10,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.7",
            boxShadow: `0 12px 32px -20px ${base._400}`,
        },

        table: {
            margin: "20px 0",
            width: "100%",
            borderCollapse: "collapse",
            border: `1px solid ${base._200}`,
            borderRadius: 10,
            overflow: "hidden",
            fontSize: "0.9375rem",
        },

        th: {
            ...text,
            padding: "10px 14px",
            textAlign: "left",
            fontWeight: "700",
            fontSize: "0.9375rem",
            color: primary._700,
            background: primary._50,
            borderBottom: `1px solid ${base._200}`,
        },

        td: {
            ...text,
            padding: "10px 14px",
            fontSize: "0.9375rem",
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
            margin: "32px 0",
            border: "none",
            borderTop: `1px solid ${base._200}`,
        },

        linenumber: {
            padding: "16px 8px",
            margin: "4px 8px",
            color: base._400,
            borderRight: `1px solid ${base._300}`,
        },
    };
}

const DefaultTheme = CreateDefaultTheme(Green, Pink);

export default DefaultTheme;
