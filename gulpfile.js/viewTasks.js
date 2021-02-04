const gulp = require("gulp");
const inject = require("gulp-inject");
const args = require("yargs");
const paths = require("./paths");

const compileIndex = function() {
    const jsIndex = gulp.src(paths.getJsEntryPath());
    return gulp.src(paths.getHTMLEntryPath())
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

const watchIndex = function(cb) {
    const prod = args.argv;
    if(prod) {
        return cb();
    }
    gulp.watch(paths.getHTMLEntryPath(), compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}