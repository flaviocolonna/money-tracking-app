const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const paths = require("./paths");
const gulpIf = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const args = require("yargs").argv;

const bundleJS = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function() {
    const prod = args.prod;
    const debug = args.debug;
    return browserify({
        entries: paths.getJsEntryPath()
    })
        .bundle()
        .pipe(source(paths.getJSOutputEntry()))
        .pipe(buffer())
        .pipe(gulpIf(debug, sourcemaps.init()))
        .pipe(gulpIf(prod, uglify()))
        .pipe(gulpIf(debug, sourcemaps.write("./")));
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