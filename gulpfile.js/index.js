const gulp = require("gulp");
const series = gulp.series;
const compileIndex = require("./viewTasks").compileIndex;
const copyJs = require("./jsTasks").copyJs;

const dev = series(compileIndex, copyJs /*, serve, watchHtml */);

module.exports = {
    dev: dev
};