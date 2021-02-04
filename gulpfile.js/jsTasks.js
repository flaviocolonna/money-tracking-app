const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const args = require("yargs");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const paths = require("./paths");

const bundleJS = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function() {
    const prod = args.argv;
    return browserify({
        entries: paths.getJsEntryPath()
    })
        .bundle()
        .pipe(source(paths.getJSOutputEntry()))
        .pipe(buffer())
        .pipe(gulpIf(prod, uglify()));
}

const watchJS = function(cb) {
    const prod = args.argv;
    if(prod) {
        return cb();
    }
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJS);
    cb();
};

module.exports = {
    bundleJS: bundleJS,
    watchJS: watchJS
}