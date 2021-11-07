const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const del = require('del');

const browserSync = require('browser-sync');

var paths = {
  base: 'dist/',
  pug: {
    src: 'src/index.pug',
    dest: 'dist/'
  },
  slidesPug: {
    src: 'src/slides/*.pug',
    dest: 'dist/slides/'
  },
  revealjs: {
    src: 'node_modules/reveal.js/**',
    dest: 'dist/reveal.js/'
  }
};

function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: paths.base,
    },
    port: process.env.PORT || 5000
  });
  done();
}

function previewReload(done) {
  console.log("Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function clean() {
  return del(['dist/*']);
}

function styles() {
  return gulp.src(paths.revealjs.src)
    .pipe(gulp.dest(paths.revealjs.dest));
}

function pug() {
  return gulp.src(paths.pug.src)
    .pipe(gulpPug())
    .pipe(gulp.dest(paths.pug.dest));
}

function slides() {
  return gulp.src(paths.slidesPug.src)
    .pipe(gulpPug())
    .pipe(gulp.dest(paths.slidesPug.dest));
}

function watch() {
  gulp.watch(paths.pug.src, gulp.series(pug, previewReload));
  gulp.watch(paths.slidesPug.src, gulp.series(slides, previewReload));
}

var dev = gulp.series(
  clean,
  gulp.parallel(pug, slides, styles),
  livePreview,
  watch
);

var build = gulp.series(clean, gulp.parallel(pug, slides, styles));

exports.build = build;
exports.watch = watch;
exports.dev = dev;

exports.default = build;