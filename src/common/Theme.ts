import type { CSSProperties } from "react";

export interface Theme {
    h1?: CSSProperties;
    h2?: CSSProperties;
    h3?: CSSProperties;
    h4?: CSSProperties;
    h5?: CSSProperties;
    h6?: CSSProperties;
    p?: CSSProperties;
    strong?: CSSProperties;
    em?: CSSProperties;
    del?: CSSProperties;
    img?: CSSProperties;
    blockquote?: CSSProperties;
    a?: CSSProperties;
    code?:CSSProperties;
    pre?: CSSProperties;
    table?: CSSProperties;
    th?: CSSProperties;
    td?: CSSProperties;
    ol?: CSSProperties;
    ul?: CSSProperties;
    li?: CSSProperties;

    linenumber?: CSSProperties;
}