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
    }
}