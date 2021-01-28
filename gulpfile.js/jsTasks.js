const gulp = require("gulp");

const copyJs = function() {
    const jsIndex = "./src/js/index.js";
    const utilsIndex = "./src/js/utils.js";
    const modelsIndex = "./src/js/models/Wallet.js";
    return gulp.src([jsIndex, utilsIndex, modelsIndex], { base: "./src" })
        .pipe(gulp.dest("./dist"));
};

const watchJS = function(cb) {
    gulp.watch("./src/js/**/*", copyJs);
    cb();
};

module.exports = {
    copyJs: copyJs,
    watchJS: watchJS
}