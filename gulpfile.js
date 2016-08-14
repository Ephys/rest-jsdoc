
const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const sequence = require('run-sequence');

const paths = {
  es6: ['src/**/*.js'],
  es5: 'es5'
};

gulp.task('transpile', function (callback) {
  sequence('transpile-clean', 'transpile-babel', callback);
});

gulp.task('transpile-clean', function () {
  return gulp.src(paths.es5, { read: false }).pipe(clean());
});

gulp.task('transpile-babel', function () {
  return gulp.src(paths.es6)
    .pipe(babel())
    .pipe(gulp.dest(paths.es5));
});
