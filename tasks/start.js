'use strict';

const nodemon = require('gulp-nodemon');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const {green} = require('chalk');
const {execSync} = require('child_process');

const APP_NAME = 'calculator';

gulp.task('start', 'Start hot reload server via nodemon.', async function() {
  console.log(green(`Starting ${APP_NAME} ...` ));

  runSequence('assets');

  nodemon({
    script: './src/server.js',
    args:['app-server'],
    watch: 'src',
    ext: 'js html scss',
    env: {'NODE_ENV': 'development'},
  }).on('start', function() {
    console.log(green(`Kicking off webpack...` ));
    execSync('webpack');
  });
});
