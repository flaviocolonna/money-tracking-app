const gulp = require("gulp");
const inject = require("gulp-inject");
const paths = require("./paths");

const compileIndex = function() {
    const jsIndex = gulp.src(paths.getJsEntryPath());
    const utilsIndex = gulp.src(paths.getJsSrcPath("/utils.js"));
    const modelsIndex = gulp.src(paths.getJsSrcPath("/models/Wallet.js"));
    return gulp.src(paths.getHTMLEntryPath())
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(inject(utilsIndex, { relative: true, name: "custom:utils" }))
        .pipe(inject(modelsIndex, { relative: true, name: "custom:models" }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

const watchIndex = function(cb) {
    gulp.watch(paths.getHTMLEntryPath(), compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}