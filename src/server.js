'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');

const enableLogging = process.argv[2] === 'app-server';
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.NODE_PORT || 3090;
// Order matters
const app = express();
app.use(express.static(publicPath));

const indexPath = path.join(__dirname, './index.html');

app.get('/', function(req, res, next) {
  res.sendFile(indexPath);
});


const server = app.listen(PORT, function() {
  if (enableLogging) {
    console.log(chalk.green('server listening at http://localhost:3090 ...'));
  }
});

module.exports = server;
