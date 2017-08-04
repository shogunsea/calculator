'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const runSequence = require('run-sequence');

const htmlPathPattern = './src/*.html';
const publicPath = './public';

gulp.task('assets:clean', 'Clean up public folder', function() {
  return del([
    publicPath,
  ]);
});

gulp.task('assets:html', 'Copy html to public folder', function() {
  return gulp.src(htmlPathPattern)
    .pipe(rename((path) => {
        path.dirname = path.dirname.replace('/frontend', '')
        .replace('modules/', '');
      }))
    .pipe(gulp.dest('./public'));
});

gulp.task('assets', function() {
  return runSequence(
    'assets:clean',
    'assets:html',
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('ASSETS FINISHED SUCCESSFULLY');
      }
    });
});
