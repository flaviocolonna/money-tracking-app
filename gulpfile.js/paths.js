const paths = {
    global: {
        src: "./src",
        dist: "./dist"
    },
    html: {
        entry: "index.html",
        dist: "index.html"
    },
    js: {
        entry: "index.js",
        base: "js",
        dist: "js"
    },
    css: {
        entry: "index.css",
        base: "css",
        dist: "css"
    },
    icons: {
        base: "icons",
        dist: "icons"
    }
}

module.exports = {
    getDistFolder: function() {
        return paths.global.dist;
    },
    getSrcFolder: function() {
        return paths.global.src;
    },
    getHTMLEntryPath: function() {
        return paths.global.src + '/' + paths.html.entry;
    },
    getJsEntryPath: function() {
        return paths.global.src + '/' + paths.js.base + '/' + paths.js.entry;
    },
    getJsSrcPath: function(innerPath) {
        const baseJSPath = paths.global.src + '/' + paths.js.base;
        if(innerPath) {
            return baseJSPath + '/' + innerPath;
        }
        return baseJSPath;
    },
    getJSOutputPath: function() {
        return this.getDistFolder() + '/' + paths.js.dist;
    },
    getJSOutputEntry: function() {
        return paths.js.entry;
    },
    getCSSEntryPath: function() {
        return paths.global.src + '/' + paths.css.base + '/' + paths.css.entry;
    },
    getCSSSrcPath: function(innerPath) {
        const baseCSSPath = paths.global.src + '/' + paths.css.base;
        if(innerPath) {
            return baseCSSPath + '/' + innerPath;
        }
        return baseCSSPath;
    },
    getOutputCSSFilename: function() {
        return paths.css.entry;
    },
    getCSSOutputPath: function() {
        return this.getDistFolder() + '/' + paths.css.dist;
    },
    getIconsSrcPath: function(innerPath) {
        const baseIconsPath = paths.global.src + '/' + paths.icons.base;
        if(innerPath) {
            return baseIconsPath + '/' + innerPath;
        }
        return baseIconsPath;
    },
}