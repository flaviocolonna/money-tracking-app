const gulp = require("gulp");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");

const dev = series(viewTasks.compileIndex, jsTasks.copyJs, jsTasks.watchJS, viewTasks.watchIndex /*, serve, watchHtml */);

module.exports = {
    dev: dev
};