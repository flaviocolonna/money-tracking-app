const gulp = require('gulp');
const series = gulp.series;
const paths = require('./paths');
const { compileIndex, watchIndex } = require('./viewTasks');
const { bundleJS, watchJS } = require('./jsTasks');
const {
    copyEnv,
    processIcons,
    watchIcons,
    processCSS,
    watchCSS,
} = require('./assetsTasks');
const { serve } = require('./serveTasks');
const del = require('del');

const clean = function (cb) {
    del.sync(paths.getDistFolder(), { force: true });
    cb();
};

const build = series(
    clean,
    compileIndex,
    copyEnv,
    processIcons,
    watchIcons,
    processCSS,
    watchCSS,
    bundleJS,
    watchJS,
    watchIndex,
    serve
);

module.exports = {
    build,
};
