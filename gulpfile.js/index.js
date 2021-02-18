const gulp = require("gulp");
const series = gulp.series;
const paths = require("./paths");
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const assetsTasks = require("./assetsTasks");
const serveTasks = require("./serveTasks");
const del = require("del");

const clean = function(cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
}

const build = series(clean, viewTasks.compileIndex, assetsTasks.processIcons, assetsTasks.watchIcons, assetsTasks.processCSS, assetsTasks.watchCSS, jsTasks.bundleJS, jsTasks.watchJS, viewTasks.watchIndex, serveTasks.serve);

module.exports = {
    build: build
};