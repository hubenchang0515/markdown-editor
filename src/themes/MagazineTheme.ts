import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SERIF } from "./fonts";

/**
 * 杂志样式：纸张色调、衬线字体、居中标题、首行缩进与简介式分隔线
 */
export function CreateMagazineTheme(primary: Color, secondary: Color, base: Color): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SERIF,
        fontSize: "16px",
        lineHeight: "2",
        color: base._900,
    };

    return {
        h1: {
            ...text,
            margin: "8px 0 12px",
            paddingBottom: 16,
            fontSize: "3rem",
            fontWeight: "700",
            lineHeight: "1.25",
            textAlign: "center",
            letterSpacing: "0.06em",
            color: base._900,
            borderBottom: `3px double ${base._400}`,
        },

        h2: {
            ...text,
            margin: "40px 0 20px",
            padding: "10px 0",
            fontSize: "1.375rem",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "0.12em",
            color: primary._700,
            borderTop: `1px solid ${base._400}`,
            borderBottom: `1px solid ${base._400}`,
        },

        h3: {
            ...text,
            margin: "32px 0 12px",
            paddingLeft: 10,
            fontSize: "1.2rem",
            fontWeight: "700",
            fontStyle: "italic",
            color: primary._700,
            borderLeft: `3px solid ${primary._300}`,
        },

        h4: {
            ...text,
            margin: "28px 0 10px",
            fontSize: "1.125rem",
            fontWeight: "700",
            color: base._900,
        },

        h5: {
            ...text,
            margin: "24px 0 10px",
            fontSize: "1rem",
            fontWeight: "700",
            color: base._800,
        },

        h6: {
            ...text,
            margin: "24px 0 10px",
            fontSize: "0.9375rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            color: base._600,
        },

        p: {
            ...text,
            margin: "0 0 14px",
            fontSize: "1.0625rem",
            lineHeight: "2",
            textAlign: "justify",
            textIndent: "2em",
        },

        strong: {
            fontWeight: "700",
            color: base._900,
        },

        em: {
            fontStyle: "italic",
        },

        del: {
            color: base._500,
            textDecoration: `line-through ${base._400}`,
        },

        img: {
            display: "block",
            margin: "28px auto",
            padding: 8,
            maxWidth: "100%",
            background: "#ffffff",
            border: `1px solid ${base._200}`,
        },

        blockquote: {
            ...text,
            margin: "28px 36px",
            padding: "8px 20px",
            borderLeft: `3px solid ${primary._300}`,
            fontStyle: "italic",
            color: base._600,
        },

        a: {
            color: primary._700,
            textDecoration: "underline",
            textDecorationStyle: "dotted",
            textUnderlineOffset: "3px",
        },

        code: {
            padding: "2px 5px",
            background: base._100,
            color: secondary._700,
            fontFamily: MONO,
            fontSize: "0.875em",
        },

        pre: {
            ...text,
            margin: "28px 0",
            padding: "20px 24px",
            background: base._100,
            borderTop: `2px solid ${base._400}`,
            borderBottom: `2px solid ${base._400}`,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.75",
        },

        table: {
            margin: "28px 0",
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9375rem",
        },

        th: {
            ...text,
            padding: "10px 12px",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "0.9375rem",
            borderTop: `2px solid ${base._500}`,
            borderBottom: `1px solid ${base._400}`,
        },

        td: {
            ...text,
            padding: "10px 12px",
            textAlign: "left",
            fontSize: "0.9375rem",
            borderBottom: `1px solid ${base._200}`,
        },

        ol: {
            margin: "0 0 16px",
            paddingLeft: "2em",
        },

        ul: {
            margin: "0 0 16px",
            paddingLeft: "2em",
        },

        li: {
            ...text,
            margin: "8px 0",
            lineHeight: "1.9",
        },

        hr: {
            margin: "32px 0",
            border: "none",
            borderTop: `3px double ${base._400}`,
        },

        linenumber: {
            margin: "4px 8px",
            padding: "16px 8px",
            fontFamily: SERIF,
            color: base._400,
            borderRight: `1px solid ${base._200}`,
        },
    };
}
