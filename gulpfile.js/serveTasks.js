const browserSync = require("browser-sync").create();
const paths = require('./paths');

const serve = function() {
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