import { marked, type MarkedExtension } from "marked";
import type { CSSProperties } from "react";
import type { Theme } from "../common/Theme";
import { highlight } from "./highlight";

// function escapeHTML(text:string) {
//     const div = document.createElement('div');
//     div.textContent = text;
//     return div.innerHTML;
// }

function unescapeHTML(text:string) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent??"";
}

async function urlToBase64(url:string): Promise<string|null> {
  try {
    // 获取资源
    const response = await fetch(url);
    const blob = await response.blob();
    
    // 转换为 Base64
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    
    return base64 as string; // 返回 Data URL
  } catch (error) {
    console.error('转换失败:', error);
    return null;
  }
}

function styleToString(style?: CSSProperties): string {
    if (!style) return "";
    return Object.entries(style)
        .map(([key, value]) => {
        if (value == null) return "";

        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

        // 数字自动加 px（CSS 特例）
        const cssValue =
            typeof value === "number" ? `${value}px` : value;

        return `${cssKey}: ${cssValue};`;
        })
        .join(" ");
}

function createExt(theme?:Theme) {
    const ext: MarkedExtension = {
        gfm: true,
        async: true,

        async walkTokens(token) {
            if (token.type === "image") {
                const { href } = token;
                token.href = await urlToBase64(href);
            }
        },

        renderer: {
            heading({ tokens, depth }) {
                const content = this.parser.parse(tokens);
                const id = unescapeHTML(content).replace(/\s+/g, "-");
                switch (depth) {
                    case 1: return `<h1 id=${id} style="${styleToString(theme?.h1)}">${content}</h${depth}>`;
                    case 2: return `<h1 id=${id} style="${styleToString(theme?.h2)}">${content}</h${depth}>`;
                    case 3: return `<h1 id=${id} style="${styleToString(theme?.h3)}">${content}</h${depth}>`;
                    case 4: return `<h1 id=${id} style="${styleToString(theme?.h4)}">${content}</h${depth}>`;
                    case 5: return `<h1 id=${id} style="${styleToString(theme?.h5)}">${content}</h${depth}>`;
                    case 6: return `<h1 id=${id} style="${styleToString(theme?.h6)}">${content}</h${depth}>`;
                }
                return `<h${depth} id=${id}>${content}</h${depth}>`;
            },

            paragraph({tokens}) {
                const content = this.parser.parseInline(tokens);
                return `<p style="${styleToString(theme?.p)}">${content}</p>`;
            },

            strong({tokens}) {
                const content = this.parser.parseInline(tokens);
                return `<strong style="${styleToString(theme?.strong)}">${content}</strong>`;
            },

            em({tokens}) {
                const content = this.parser.parseInline(tokens);
                return `<em style="${styleToString(theme?.em)}">${content}</em>`;
            },

            del({tokens}) {
                const content = this.parser.parseInline(tokens);
                return `<del style="${styleToString(theme?.del)}">${content}</del>`;
            },

            link({href, title, tokens}) {
                const content = this.parser.parseInline(tokens);
                return `<a href="${href}" title="${title??content}" target="_blank" style="${styleToString(theme?.a)}">${content}</a>`;
            },

            blockquote({tokens}) {
                const content = this.parser.parse(tokens);
                return `<blockquote style="${styleToString(theme?.blockquote)}">${content}</blockquote>`;
            },

            image({href, title, text}) {
                return `<img src="${href}" title="${title}" alt="${text}" style="${styleToString(theme?.img)}"/>`;
            },

            codespan({text}) {
                return `<code style="${styleToString(theme?.code)}">${text}</code>`
            },

            code({text, lang}) {
                const highlighted = lang ? highlight(text, lang) : text;
                return `<pre style="${styleToString(theme?.pre)}"><code>${highlighted}</code></pre>`;
            },

            table({header, rows}) {
                return `<table style="${styleToString(theme?.table)}"><thead><tr>${header.map(head => this.tablecell(head)).join('')}</tr></thead><tbody>${rows.map(row => '<tr>' + row.map(cell => this.tablecell(cell)).join('') + '</tr>').join('')}</tbody></table>`;
            },

            tablecell({header, tokens, align}) {
                const content = this.parser.parseInline(tokens);
                return header ? `<th style="text-align:${align};${styleToString(theme?.th)}">${content}</th>` : `<td style="text-align:${align};${styleToString(theme?.td)}">${content}</td>`;
            },
        }
    }

    return ext;
}

export async function render(markdown:string, theme?:Theme) {
    marked.use(createExt(theme));
    return marked.parse(markdown, {async:true});
}