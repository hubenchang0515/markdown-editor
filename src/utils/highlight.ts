import hljs from "highlight.js";
import { Blue, Emerald, Green, Orange, Pink, Slate, Violet } from "../common/Color";
import { getOutLink, getSymbols } from "./outlink";


function addSymbols(language:string, symbols?:string[]) {
    (hljs.getLanguage(language)!.keywords as any).built_in = [
        ...new Set([
            ...((hljs.getLanguage('bash')!.keywords as any).built_in),
            ...(symbols ?? getSymbols(language)!)
        ])
    ]
}

addSymbols('bash')
addSymbols('python')
addSymbols('lua')

const STYLES = {
    // 语法单元
    "hljs-meta": `color:${Green._500};font-weight:bold;`,
    "hljs-title": `color:${Emerald._500};font-weight:bold;`,
    "hljs-built_in": `color:${Pink._500};font-weight:bold;`,
    "hljs-keyword": `color:${Pink._500};font-weight:bold;`,
    "hljs-comment": `color:${Slate._400};`,

    // 字面量
    "hljs-number": `color:${Orange._500};`,
    "hljs-string": `color:${Orange._500};`,

    // 符号
    "hljs-variable": `color:${Blue._600};`,
    "hljs-params": `color:${Blue._600};`,
    "hljs-name": `color:${Violet._600};`,
    "hljs-attr": `color:${Blue._500};`,
    "hljs-attribute": `color:${Pink._500};`,
};

function walk(node: Node, language:string) {
    if (!(node instanceof HTMLElement)) return;

    const element = node as HTMLElement;
    element.classList.forEach(c => {
        if (c in STYLES) {
            element.style.cssText += STYLES[c as keyof typeof STYLES]
        }
    });

    if (element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE) {
        const text = element.innerText;
        const link = getOutLink(text, language);
        if (link) {
            element.innerHTML = `<a href="${link}" target="_blank" style="color:unset;">${text}</a>`
        }
        return;
    }

    node.childNodes.forEach(n => walk(n, language));
}

export function highlight(code:string, language:string) {
    let html = code;
    const key = language.trim().split(/\s+/)[0];
    const lang = hljs.getLanguage(key);
    if (lang) {
        html = hljs.highlight(code, {language: key, ignoreIllegals:true}).value;
        const div = document.createElement('div');
        div.innerHTML = html;
        walk(div, key);
        html = div.innerHTML;
    }
    return html;
}