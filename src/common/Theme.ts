import type { CSSProperties } from "react";

/**
 * 样式定义：所有样式都直接作用在对应标签的内联 style 上，
 * 不包含页面级（外层容器）样式。
 */
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
    hr?: CSSProperties;

    linenumber?: CSSProperties;
}
