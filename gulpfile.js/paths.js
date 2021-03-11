const paths = {
    global: {
        src: './src',
        dist: './dist',
    },
    html: {
        entry: 'index.html',
        dist: 'index.html',
    },
    js: {
        entry: 'index.js',
        base: 'js',
        dist: 'js',
    },
    css: {
        entry: 'index.css',
        base: 'css',
        dist: 'css',
    },
    icons: {
        base: 'icons',
        dist: 'icons',
    },
    env: {
        prod: 'env-prod.json',
        dev: 'env-dev.json',
        dist: 'env.json',
    },
};

module.exports = {
    getDistFolder: () => paths.global.dist,
    getSrcFolder: () => paths.global.src,
    getHTMLEntryPath: () => `${paths.global.src}/${paths.html.entry}`,
    getJsEntryPath: () =>
        `${paths.global.src}/${paths.js.base}/${paths.js.entry}`,
    getJsSrcPath: (innerPath) => {
        const baseJSPath = `${paths.global.src}/${paths.js.base}`;
        return innerPath ? `${baseJSPath}/${innerPath}` : baseJSPath;
    },
    getJSOutputPath: function () {
        return `${this.getDistFolder()}/${paths.js.dist}`;
    },
    getJSOutputEntry: () => paths.js.entry,
    getCSSEntryPath: () =>
        `${paths.global.src}/${paths.css.base}/${paths.css.entry}`,
    getCSSSrcPath: (innerPath) => {
        const baseCSSPath = `${paths.global.src}/${paths.css.base}`;
        return innerPath ? `${baseCSSPath}/${innerPath}` : baseCSSPath;
    },
    getOutputCSSFilename: () => paths.css.entry,
    getCSSOutputPath: function () {
        return `${this.getDistFolder()}/${paths.css.dist}`;
    },
    getIconsSrcPath: (innerPath) => {
        const baseIconsPath = `${paths.global.src}/${paths.icons.base}`;
        return innerPath ? `${baseIconsPath}/${innerPath}` : baseIconsPath;
    },
    getSrcEnv: (prod) => (prod ? `./${paths.env.prod}` : `./${paths.env.dev}`),
    getDistEnv: () => paths.env.dist,
};
