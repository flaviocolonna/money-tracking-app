const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const paths = require("./paths");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const args = require("yargs").argv;

const bundleJS = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function() {
    const prod = args.prod;
    return browserify({
        entries: paths.getJsEntryPath()
    })
        .bundle()
        .pipe(source(paths.getJSOutputEntry()))
        .pipe(buffer())
        .pipe(gulpIf(prod, uglify()));
}

const watchJS = function(cb) {
    const prod = args.prod;
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