const gulp = require("gulp");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");

const dev = series(viewTasks.compileIndex, jsTasks.copyJs, jsTasks.watchJS, viewTasks.watchIndex, serveTasks.serve);

module.exports = {
    dev: dev
};