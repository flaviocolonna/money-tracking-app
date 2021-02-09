const gulp = require("gulp");
const args = require("yargs").argv;
const inject = require("gulp-inject");
const paths = require("./paths");

const compileIndex = function() {
    const jsIndex = gulp.src(paths.getJsEntryPath());
    return gulp.src(paths.getHTMLEntryPath())
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

const watchIndex = function(cb) {
    const prod = args.prod;
    if (prod) {
        return cb();
    }
    gulp.watch(paths.getHTMLEntryPath(), compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}