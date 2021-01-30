const gulp = require("gulp");
const series = gulp.series;
const paths = require("./paths");
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");
const del = require("del");

const clean = function(cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
}

const dev = series(clean, viewTasks.compileIndex, jsTasks.copyJs, jsTasks.watchJS, viewTasks.watchIndex, serveTasks.serve);

module.exports = {
    dev: dev
};