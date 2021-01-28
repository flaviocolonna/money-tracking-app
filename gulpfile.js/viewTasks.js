const gulp = require("gulp");
const inject = require("gulp-inject");

const compileIndex = function() {
    const jsIndex = gulp.src("./src/js/index.js");
    const utilsIndex = gulp.src("./src/js/utils.js");
    const modelsIndex = gulp.src("./src/js/models/Wallet.js");
    return gulp.src("./src/index.html")
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(inject(utilsIndex, { relative: true, name: "custom:utils" }))
        .pipe(inject(modelsIndex, { relative: true, name: "custom:models" }))
        .pipe(gulp.dest("./dist"));
}

const watchIndex = function(cb) {
    gulp.watch("./src/index.html", compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}