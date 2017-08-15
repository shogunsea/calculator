# calculator  [![CircleCI](https://circleci.com/gh/shogunsea/calculator/tree/master.svg?style=shield)](https://circleci.com/gh/shogunsea/calculator/tree/master)
Plain calculator mirco app in HTML/CSS/JS.

## Getting started

### Setting up environemt
node@8, npm@5 or yarn@stable
`npm install` or `yarn install`

### Fire up server
`gulp start` or `gulp s`

### Run tests
`npm test`

### Build assets
`gulp assets` or `gulp a`

### Architecture

We use flux as its architecture pattern:
![screenshot](https://raw.githubusercontent.com/shogunsea/calculator/master/spec/calculator_architecture.png)

### Tests structure
Unit tests live in the same folder of source file. e.g. `calculator_store.js` and `calculator_store.test.js`.
`jest src` for short.

Functional tests are defined in `tests/functional` folder.
`jest functional` or `jest fun` for short.

No integration tests: functional + unit tests should cover it.

Jest coverage report are created at `tests/coverage`.
