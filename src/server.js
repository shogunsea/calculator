'use strict';

const express = require('express');
const chalk = require('chalk');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
let PORT = process.env.NODE_PORT || 3090;
const testEnvPort = 3099;

// Order matters
const app = express();
app.use(express.static(publicPath));

const indexPath = path.join(__dirname, './index.html');
const nonTestEnv = process.argv[2] === 'app-server';

app.get('/', function(req, res, next) {
  res.sendFile(indexPath);
});

PORT = nonTestEnv? PORT : testEnvPort;
const server = app.listen(PORT, function() {

  if (nonTestEnv) {
    console.log(chalk.green(`server listening at http://localhost:${PORT} ...`));
  }
});

module.exports = server;
