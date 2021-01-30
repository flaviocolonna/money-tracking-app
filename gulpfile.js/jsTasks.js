const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const paths = require("./paths");

const bundleJS = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function() {
    return browserify({
        entries: paths.getJsEntryPath()
    })
        .bundle()
        .pipe(source(paths.getJSOutputEntry()))
        .pipe(buffer());
}

const watchJS = function(cb) {
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJS);
    cb();
};

module.exports = {
    bundleJS: bundleJS,
    watchJS: watchJS
}