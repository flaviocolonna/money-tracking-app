const gulp = require("gulp");

const copyJs = function() {
    const jsIndex = "./src/js/index.js";
    const utilsIndex = "./src/js/utils.js";
    const modelsIndex = "./src/js/models/Wallet.js";
    return gulp.src([jsIndex, utilsIndex, modelsIndex], { base: "./src" })
        .pipe(gulp.dest("./dist"));
};

module.exports = {
    copyJs: copyJs
}