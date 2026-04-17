import { Green, Pink, Red, Slate, type Color } from "../common/Color";
import type { Theme } from "../common/Theme";

export function CreateDefaultTheme(primary:Color, secondary:Color, base:Color=Slate) {
    return {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 'bolder',
            textAlign: 'center',
            color: primary._500,
        },

        h2: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: primary._500,
            borderLeft: `4px solid ${primary._500}`,
            borderBottom: `1px solid ${primary._500}`,
            paddingLeft: 4,
        },

        h3: {
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h4: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h5: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        h6: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: primary._500,
            borderColor: primary._500,
        },

        p: {
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
            padding: 16,
            background: base._50,
            border: `1px solid ${base._100}`,
            overflow: 'auto',
            borderRadius: 4,
        },

        table: {
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
    } as Theme;
}

const DefaultTheme = CreateDefaultTheme(Green, Pink);

export default DefaultTheme;