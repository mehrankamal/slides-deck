const gulp = require('gulp');
const gulpPug = require("gulp-pug");
const del = require('del');

var paths = {
  pug: {
    src: 'src/index.pug',
    dest: 'dist/'
  },
  slidesPug: {
    src: 'src/slides/*.pug',
    dest: 'dist/slides/'
  }
};

function clean(){
  return del(['dist/*']);
}

function pug(){
  return gulp.src(paths.pug.src)
  .pipe(gulpPug())
  .pipe(gulp.dest(paths.pug.dest));
}

function slides(){
  return gulp.src(paths.slidesPug.src)
  .pipe(gulpPug())
  .pipe(gulp.dest(paths.slidesPug.dest));
}

function watch(){
  gulp.watch(paths.pug.src, pug);
  gulp.watch(paths.slidesPug.src, slides);
}

var build = gulp.series(clean, gulp.parallel(pug, slides));

exports.build = build;
exports.watch = watch;

exports.default = build;