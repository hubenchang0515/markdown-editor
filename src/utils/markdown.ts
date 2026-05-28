import { Marked, type MarkedExtension, type Token, type Tokens } from "marked";
import type { CSSProperties } from "react";
import type { Theme } from "../common/Theme";
import { highlight } from "./highlight";
import { loadFile } from "./db";

function escapeHTML(text:string) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function blobToBase64(file:Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
    })
}

async function urlToBase64(url:string): Promise<string|null> {
  try {
    // 获取资源
    const response = await fetch(url);
    const blob = await response.blob();
    
    return blobToBase64(blob);
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

function setLineNumber(tokens:Token[], start:number=1) {
    for (const token of tokens) {
        (token as any).line = start;

        if ('tokens' in token) {
            setLineNumber((token as any).tokens, start);
        }

        if ('items' in token) {
            setLineNumber((token as any).items, start);
        }

        if (token.raw?.includes("\n")) {
            const count = (token.raw.match(/\n/g) || []).length;
            start += count;
        }
    }

    return tokens;
}

function createExt(theme?:Theme) {
    const ext: MarkedExtension = {
        gfm: true,
        async: true,
        
        hooks: {
            processAllTokens(tokens) {
                return setLineNumber(tokens);
            }
        },

        async walkTokens(token) {
            // 图片转 base64，以便复制
            if (token.type === "image") {
                const { href } = token as Tokens.Image;
                if (href.startsWith("IDB:")) {
                    const res = await loadFile(href.slice(4));
                    if (res) {
                        token.href = await blobToBase64(res.file);
                    }
                } else {
                    token.href = await urlToBase64(href);
                }
            }
        },

        renderer: {
            heading(token) {
                const content = this.parser.parseInline(token.tokens);
                const id = escapeHTML(content).replace(/\s+/g, "-");
                console.log(id)
                const line = (token as any).line;
                switch (token.depth) {
                    case 1: return `<h1 id=${id} class="line-${line}" style="${styleToString(theme?.h1)}">${content}</h1>`;
                    case 2: return `<h2 id=${id} class="line-${line}" style="${styleToString(theme?.h2)}">${content}</h2>`;
                    case 3: return `<h3 id=${id} class="line-${line}" style="${styleToString(theme?.h3)}">${content}</h3>`;
                    case 4: return `<h4 id=${id} class="line-${line}" style="${styleToString(theme?.h4)}">${content}</h4>`;
                    case 5: return `<h5 id=${id} class="line-${line}" style="${styleToString(theme?.h5)}">${content}</h5>`;
                    case 6: return `<h6 id=${id} class="line-${line}" style="${styleToString(theme?.h6)}">${content}</h6>`;
                }
                return `<h${token.depth} id=${id} class="line-${line}">${content}</h${token.depth}>`;
            },

            paragraph(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<p class="line-${line}" style="${styleToString(theme?.p)}">${content}</p>`;
            },

            strong(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<strong class="line-${line}" style="${styleToString(theme?.strong)}">${content}</strong>`;
            },

            em(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<em class="line-${line}" style="${styleToString(theme?.em)}">${content}</em>`;
            },

            del(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<del class="line-${line}" style="${styleToString(theme?.del)}">${content}</del>`;
            },

            link(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return `<a class="line-${line}" href="${token.href}" title="${token.title??token.text}" target="_blank" style="${styleToString(theme?.a)}">${content}</a>`;
            },

            blockquote(token) {
                const content = this.parser.parse(token.tokens);
                const line = (token as any).line;
                return `<blockquote class="line-${line}" style="${styleToString(theme?.blockquote)}">${content}</blockquote>`;
            },

            image(token) {
                const line = (token as any).line;
                return `<img class="line-${line}" src="${token.href}" title="${token.title}" alt="${token.text}" style="${styleToString(theme?.img)}"/>`;
            },

            codespan(token) {
                const line = (token as any).line;
                return `<code class="line-${line}" style="${styleToString(theme?.code)}">${highlight(token.text, 'text')}</code>`
            },

            code(token) {
                const code = token.lang ? highlight(token.text, token.lang) : token.text;
                const line = (token as any).line;
                return `<pre class="line-${line}" style="${styleToString(theme?.pre)}"><code>${code}</code></pre>`;
            },

            table(token) {
                const line = (token as any).line;
                return `<table class="line-${line}" style="${styleToString(theme?.table)}"><thead><tr>${token.header.map(head => this.tablecell(head)).join('')}</tr></thead><tbody>${token.rows.map(row => '<tr>' + row.map(cell => this.tablecell(cell)).join('') + '</tr>').join('')}</tbody></table>`;
            },

            tablecell(token) {
                const content = this.parser.parseInline(token.tokens);
                const line = (token as any).line;
                return token.header ? `<th class="line-${line}" style="text-align:${token.align};${styleToString(theme?.th)}">${content}</th>` : `<td style="text-align:${token.align};${styleToString(theme?.td)}">${content}</td>`;
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
                const line = (token as any).line;
                if (token.loose) {
                    return `<li class="line-${line}" style="${styleToString(theme?.li)}"><p>${content}</p></li>`
                } else {
                    return `<li class="line-${line}" style="${styleToString(theme?.li)}">${content}</li>`
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