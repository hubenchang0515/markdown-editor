import type { Plugin } from 'vite';

const SITEMAP_URL = 'https://primers.xplanc.org/sitemap.xml';

/**
 * 在构建开始前拉取 sitemap，并以内联模块的方式打包，
 * 避免应用运行时再请求外部地址。
 */
export function sitemapPlugin(): Plugin {
  const virtualId = 'virtual:sitemap';
  const resolvedId = `\0${virtualId}`;
  let sitemap: Promise<string> | undefined;

  const fetchSitemap = () => {
    sitemap ??= (async () => {
      let lastError: unknown;

      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          const response = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(30_000) });
          if (!response.ok) {
            throw new Error(`Failed to fetch ${SITEMAP_URL}: ${response.status} ${response.statusText}`);
          }
          return await response.text();
        } catch (error) {
          lastError = error;
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
          }
        }
      }

      throw lastError;
    })();
    return sitemap;
  };

  return {
    name: 'sitemap',

    async buildStart() {
      await fetchSitemap();
    },

    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },

    async load(id) {
      if (id !== resolvedId) return;
      return `export default ${JSON.stringify(await fetchSitemap())};`;
    },
  };
}
