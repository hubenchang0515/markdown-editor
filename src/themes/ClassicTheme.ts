import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import { MONO, SANS } from "./fonts";

/**
 * 经典样式：紧凑的文档排版，标题下划线、表格与引用清晰规整
 */
export function CreateClassicTheme(primary: Color, secondary: Color, base: Color): Theme {
    // 基础排版逐标签内联，不依赖任何页面级样式
    const text = {
        fontFamily: SANS,
        fontSize: "16px",
        lineHeight: "1.6",
        color: base._800,
    };

    return {
        h1: {
            ...text,
            margin: "24px 0 16px",
            paddingBottom: "0.3em",
            fontSize: "2em",
            fontWeight: "600",
            borderBottom: `1px solid ${base._200}`,
        },

        h2: {
            ...text,
            margin: "24px 0 16px",
            paddingBottom: "0.3em",
            fontSize: "1.5em",
            fontWeight: "600",
            borderBottom: `1px solid ${base._200}`,
        },

        h3: {
            ...text,
            margin: "24px 0 16px",
            fontSize: "1.25em",
            fontWeight: "600",
        },

        h4: {
            ...text,
            margin: "24px 0 16px",
            fontSize: "1em",
            fontWeight: "600",
        },

        h5: {
            ...text,
            margin: "24px 0 16px",
            fontSize: "0.875em",
            fontWeight: "600",
        },

        h6: {
            ...text,
            margin: "24px 0 16px",
            fontSize: "0.85em",
            fontWeight: "600",
            color: base._500,
        },

        p: {
            ...text,
            margin: "0 0 16px",
            lineHeight: "1.6",
        },

        strong: {
            fontWeight: "600",
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
            maxWidth: "100%",
            boxSizing: "content-box",
            background: "#ffffff",
        },

        blockquote: {
            ...text,
            margin: "0 0 16px",
            padding: "0 1em",
            color: base._500,
            borderLeft: `0.25em solid ${base._300}`,
        },

        a: {
            color: primary._600,
            textDecoration: "none",
        },

        code: {
            margin: 0,
            padding: "0.2em 0.4em",
            fontSize: "85%",
            background: base._100,
            color: secondary._700,
            borderRadius: 6,
            fontFamily: MONO,
        },

        pre: {
            ...text,
            margin: "0 0 16px",
            padding: 16,
            background: base._50,
            border: `1px solid ${base._200}`,
            borderRadius: 6,
            overflow: "auto",
            fontFamily: MONO,
            fontSize: "0.875rem",
            lineHeight: "1.5",
        },

        table: {
            margin: "0 0 16px",
            width: "100%",
            borderCollapse: "collapse",
        },

        th: {
            ...text,
            padding: "6px 13px",
            fontWeight: "600",
            textAlign: "left",
            background: base._50,
            border: `1px solid ${base._300}`,
        },

        td: {
            ...text,
            padding: "6px 13px",
            border: `1px solid ${base._300}`,
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
            marginBlock: 4,
        },

        hr: {
            margin: "24px 0",
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
