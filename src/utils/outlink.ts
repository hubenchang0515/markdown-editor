const SITE_MAP = await (await fetch('https://xplanc.org/primers/sitemap.xml')).text();

const PYTHON_SYMBOLS =  [
    ...SITE_MAP.matchAll(/https:\/\/xplanc.org\/primers\/document\/zh\/02.Python\/EX.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0\/EX\.(.*?)\.md/g),
    ...SITE_MAP.matchAll(/https:\/\/xplanc.org\/primers\/document\/zh\/02.Python\/EX.%E5%86%85%E7%BD%AE%E6%A8%A1%E5%9D%97\/EX\.(.*?)\.md/g),
].map(i=>[i[0], decodeURIComponent(i[1])]);

const LUA_SYMBOLS = [
    ...SITE_MAP.matchAll(/https:\/\/xplanc\.org\/primers\/document\/zh\/09\.Lua\/91\.%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0\/EX\.(.*?)\.md/g),
    ...SITE_MAP.matchAll(/https:\/\/xplanc\.org\/primers\/document\/zh\/09\.Lua\/92\.%E5%86%85%E7%BD%AE%E6%A8%A1%E5%9D%97\/EX\.(.*?)\-module\.md/g),
].map(i=>[i[0], decodeURIComponent(i[1])]);

const BASH_SYMBOLS = [
    ...SITE_MAP.matchAll(/https:\/\/xplanc\.org\/primers\/document\/zh\/10\.Bash\/90\.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C\/EX\.(.*?)\.md/g),
].map(i=>[i[0], decodeURIComponent(i[1])]);



function getSymbols(language:string) {
    switch (language.toLocaleLowerCase()) {
        case 'python': return PYTHON_SYMBOLS;
        case 'lua': return LUA_SYMBOLS;
        case 'sh':
        case 'shell':
        case 'bash': return BASH_SYMBOLS;
    }
}

export function inferLanguage(text:string) {
    if (text.toLocaleLowerCase().includes('python')) {
        return 'python';
    }

    if (text.toLocaleLowerCase().includes('bash')) {
        return 'bash';
    }

    if (text.toLocaleLowerCase().includes('lua')) {
        return 'lua';
    }
}

export function getOutLink(text:string, language:string) {
    const symbols = getSymbols(language);
    return symbols?.find(s => s[1] === text)?.[0];
}