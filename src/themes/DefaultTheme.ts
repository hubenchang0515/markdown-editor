import { Green, Pink, Red, Slate, type Color } from "../common/Color";
import type { Theme } from "../common/Theme";

export function CreateDefaultTheme(primary:Color, secondary:Color, base:Color=Slate) {
    return {
        h1: {
            marginBlock: 16,
            fontSize: '2rem',
            fontWeight: 'bolder',
            textAlign: 'center',
            color: primary._500,
        },

        h2: {
            marginBlock: 16,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: primary._500,
            borderLeft: `4px solid ${primary._500}`,
            borderBottom: `1px solid ${primary._500}`,
            paddingLeft: 4,
        },

        h3: {
            marginBlock: 16,
            fontSize: '1.375rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h4: {
            marginBlock: 16,
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h5: {
            marginBlock: 16,
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h6: {
            marginBlock: 16,
            fontSize: '1rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        p: {
            marginBlock: 16,
            fontSize: '1rem',
        },

        strong: {
            fontWeight: 'bold',
        },

        em: {
            fontStyle: 'italic',
        },

        del: {
            textDecoration: `double line-through ${Red._500}`,
        },

        img: {
            display: "block",
            margin: "auto",
            maxWidth: '100%',
            textAlign: 'center',
        },

        blockquote: {
            marginBlock: 16,
            backgroundColor: primary._50,
            borderLeft: `4px solid ${primary._400}`,
            margin: 0,
            padding: 0,
            paddingLeft: 8,
        },

        a: {
            color: primary._500,
        },

        code: {
            color: secondary._500,
            background: secondary._50,
            marginInline: 2,
            paddingInline: 2,
        },

        pre: {
            marginBlock: 16,
            padding: 16,
            background: base._50,
            border: `1px solid ${base._100}`,
            overflow: 'auto',
            borderRadius: 4,
        },

        table: {
            marginBlock: 16,
            border: `1px solid ${base._300}`,
            borderCollapse: 'collapse',
            borderCpacing: 0,
            overflow: `hidden`,
        },

        th: {
            backgroundColor: base._200,
            border: `1px solid ${base._300}`,
            padding: `0.5em 1em`,
        },

        td: {
            backgroundColor: base._50,
            border: `1px solid ${base._300}`,
            padding: `0.5em 1em`,
        },

        ul: {
            marginBlock: 0,
        },

        ol: {
            marginBlock: 0,
        },

        linenumber: {
            paddingRight: 8,
            paddingTop: 16,
            paddingBottom: 16,
            margin: '4px 8px',
            color: base._400,
            borderRight: `1px solid ${base._300}`,
        }
    } as Theme;
}

const DefaultTheme = CreateDefaultTheme(Green, Pink);

export default DefaultTheme;