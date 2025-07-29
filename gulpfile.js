// Gulp.js configuration
const gulp         = require("gulp");
const sass         = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss      = require("gulp-postcss");
const purgecss     = require("@fullhuman/postcss-purgecss");
const browserSync  = require("browser-sync").create();

// add this line:
const fileInclude  = require("gulp-file-include");

// Folders
const src   = "src/";
const build = "./";

// CSS processing (unchanged)
function css() {
  return gulp
    .src(src + "scss/main.scss", { allowEmpty: true })
    // …
    .pipe(gulp.dest(build + "css/"))
    .pipe(browserSync.reload({ stream: true }));
}

// HTML processing with file-includes
function html() {
  return gulp
    .src(src + "*.html")              // pick up any HTML in src/
    .pipe(fileInclude({
      prefix: "@@",                   // use @@include("…")
      basepath: "@file"               // look for partials next to each file
    }))
    .pipe(gulp.dest(build))           // write the output into your project root
    .pipe(browserSync.stream());      // inject changes
}

// expose tasks
exports.css  = css;
exports.html = html;

// build both
exports.build = gulp.parallel(css, html);

// watch for file changes
function watch() {
  browserSync.init({
    server: { baseDir: build },
    tunnel: false
  });

  gulp.watch(src + "scss/**/*", css);
  gulp.watch([ src + "**/*.html", src + "partials/**/*.html" ], html);
}

exports.watch = watch;
exports.default = gulp.series(exports.build, watch);
