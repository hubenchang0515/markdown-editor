import { Marked, type MarkedExtension } from "marked";
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
    let line = 1;
    const ext: MarkedExtension = {
        gfm: true,
        async: true,
        
        hooks: {
            // 标记行号，此接口不含嵌套的 token
            processAllTokens(tokens) {
                for (const token of tokens) {
                    (token as any).line = line;
                    if (token.raw?.includes("\n")) {
                        const count = (token.raw.match(/\n/g) || []).length;
                        line += count;
                    }
                }

                return tokens;
            }
        },

        // 此接口包含嵌套的 token
        async walkTokens(token) {
            // 图片转 base64
            if (token.type === "image") {
                const { href } = token;
                token.href = await urlToBase64(href);
            }
        },

        renderer: {
            heading(token) {
                const content = this.parser.parse(token.tokens);
                const id = unescapeHTML(content).replace(/\s+/g, "-");
                const line = (token as any).line;
                switch (token.depth) {
                    case 1: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h1)}">${content}</h1>`;
                    case 2: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h2)}">${content}</h2>`;
                    case 3: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h3)}">${content}</h3>`;
                    case 4: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h4)}">${content}</h4>`;
                    case 5: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h5)}">${content}</h5>`;
                    case 6: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h6)}">${content}</h6>`;
                }
                return `<h${token.depth} id=${id} class="line-${line}">${content}</h${token.depth}>`;
            },

            paragraph(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<p class="line-${line}" style="${styleToString(theme?.p)}">${content}</p>`;
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

            image(token) {
                return `<img class="line-${line}" src="${token.href}" title="${token.title}" alt="${token.text}" style="${styleToString(theme?.img)}"/>`;
            },

            codespan({text}) {
                return `<code style="${styleToString(theme?.code)}">${text}</code>`
            },

            code(token) {
                const highlighted = token.lang ? highlight(token.text, token.lang) : token.text;
                const line = (token as any).line;
                return `<pre class="line-${line}" style="${styleToString(theme?.pre)}"><code>${highlighted}</code></pre>`;
            },

            table(token) {
                const line = (token as any).line;
                return `<table class="line-${line}" style="${styleToString(theme?.table)}"><thead><tr>${token.header.map(head => this.tablecell(head)).join('')}</tr></thead><tbody>${token.rows.map(row => '<tr>' + row.map(cell => this.tablecell(cell)).join('') + '</tr>').join('')}</tbody></table>`;
            },

            tablecell({header, tokens, align}) {
                const content = this.parser.parseInline(tokens);
                return header ? `<th style="text-align:${align};${styleToString(theme?.th)}">${content}</th>` : `<td style="text-align:${align};${styleToString(theme?.td)}">${content}</td>`;
            },

            list(token) {
                const line = (token as any).line;
                if (token.ordered) {
                    return `<ol class="line-${line}" style="${styleToString(theme?.ol)}">${token.items.map(item => this.listitem(item)).join('')}</ol>`
                } else {
                    return `<ul class="line-${line}" style="${styleToString(theme?.ul)}">${token.items.map(item => this.listitem(item)).join('')}</ul>`
                }
            },

            listitem(token) {
                const content = this.parser.parse(token.tokens);
                if (token.loose) {
                    return `<li style="${styleToString(theme?.li)}"><p>${content}</p></li>`
                } else {
                    return `<li style="${styleToString(theme?.li)}">${content}</li>`
                }
            }
        }
    }

    return ext;
}

export async function render(markdown:string, theme?:Theme) {
    const marked = new Marked();
    marked.use(createExt(theme));
    return marked.parse(markdown, {async:true});
}