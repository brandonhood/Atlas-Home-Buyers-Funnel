// Gulp.js configuration

const // modules
    gulp = require("gulp"),
    // development mode?
    sass = require("gulp-sass"),
    autoprefixer = require("autoprefixer"),
    postcss = require("gulp-postcss"),
    purgecss = require("@fullhuman/postcss-purgecss"),
    browserSync = require("browser-sync").create(),


    // Folders
    src = "assets/src/",
    build = "assets/";

// CSS processing
function css() {
    return gulp
        .src(src + "scss/main.scss", { allowEmpty: true })
        .pipe(
            sass({
                outputStyle: "nested",
                imagePath: "/images/",
                precision: 3,
                errLogToConsole: true
            }).on("error", sass.logError)
        )
        .pipe(
            postcss([
                purgecss({ content: ["**/*.html", "**/*.php"] }),
                autoprefixer(),
            ])
        )
        .pipe(gulp.dest(build + "css/"))
        .pipe(browserSync.reload({ stream: true }));
}
exports.css = css;

// html processing
function html() {
    gulp.task("html", function() {
        return gulp.src(["**/*.html", "**/*.php"]);
    });
}
exports.html = gulp.series(html, css);

// run all tasks
exports.build = gulp.parallel(exports.css);

// watch for file changes
function watch(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: false
    });

    // html changes
    gulp.watch(["**/*.html", "**/*.php"], html).on("change",browserSync.reload);

    // css changes
    gulp.watch(src + "scss/**/*", css);

    done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.build, exports.watch);
