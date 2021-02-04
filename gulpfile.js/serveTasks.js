const browserSync = require("browser-sync").create();
const args = require("yargs");
const paths = require('./paths');

const serve = function(cb) {
    const prod = args.argv;
    const debug = args.argv;
    if(prod && !debug) {
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