const gulp = require('gulp');
const gulpIf = require('gulp-if');
const args = require('yargs').argv;
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const paths = require('./paths');

const processCSS = function () {
    const prod = args.prod;
    return gulp
        .src(paths.getCSSSrcPath('**/*'))
        .pipe(concat(paths.getOutputCSSFilename()))
        .pipe(gulpIf(prod, minifyCSS()))
        .pipe(gulp.dest(paths.getCSSOutputPath()));
};

const watchCSS = function (cb) {
    const prod = args.prod;
    if (prod) {
        return cb();
    }
    gulp.watch(paths.getCSSSrcPath('**/*'), processCSS);
    cb();
};

const processIcons = function () {
    return gulp
        .src(paths.getIconsSrcPath('**/*.svg'), {
            relative: true,
            base: paths.getSrcFolder(),
        })
        .pipe(svgmin())
        .pipe(gulp.dest(paths.getDistFolder()));
};
const watchIcons = function (cb) {
    const prod = args.prod;
    if (prod) {
        return cb();
    }
    gulp.watch(paths.getIconsSrcPath('**/*'), processIcons);
    cb();
};
const copyEnv = function () {
    const prod = args.prod;
    return gulp
        .src(paths.getSrcEnv(prod))
        .pipe(rename(paths.getDistEnv()))
        .pipe(gulp.dest(paths.getDistFolder()));
};

module.exports = {
    processCSS,
    watchCSS,
    processIcons,
    watchIcons,
    copyEnv,
};
