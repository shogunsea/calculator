'use strict';

const gulp = require('gulp');
// const sass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const runSequence = require('run-sequence');
// const uglifycss = require('gulp-uglifycss');

const assetsPathPattern = './src/assets/*.css';
const publicPath = './public';

gulp.task('assets:clean', 'Clean up public folder', function() {
  return del([
    publicPath,
  ]);
});

// gulp.task('assets:sass', 'Compile sass into css', function() {
gulp.task('assets:css', 'Copy css to public folder', function() {
  return gulp.src(assetsPathPattern)
    // .pipe(sass().on('error', sass.logError))
    .pipe(rename((path) => {
        path.dirname = path.dirname.replace('/frontend', '')
        .replace('modules/', '');
      }))
    // .pipe(uglifycss({
    //   'maxLineLen': 80,
    //   'uglyComments': true,
    // }))
    .pipe(gulp.dest('./public'));
});

gulp.task('assets', function() {
  return runSequence(
    'assets:clean',
    'assets:css',
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('ASSETS FINISHED SUCCESSFULLY');
      }
    });
});
