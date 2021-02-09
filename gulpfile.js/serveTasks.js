const args = require("yargs").argv;
const browserSync = require("browser-sync").create();
const paths = require('./paths');

const serve = function (cb) {
    const prod = args.prod;
    if (prod) {
        return cb();
    }
    browserSync.init({
        watch: true,
        server: {
            baseDir: paths.getDistFolder()
        }
    });
}

module.exports = {
    serve: serve
}