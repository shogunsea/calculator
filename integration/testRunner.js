const webdriverio = require('webdriverio');
const chromedriver = require('chromedriver');

const addition = require('./addition').default;

const PATH_TO_CANARY = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';
const PATH_TO_CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';

const PORT = 9515;

chromedriver.start([
  '--url-base=wd/hub',
  `--port=${PORT}`,
  '--verbose'
]);

const test = async () => {

const opts = {
  port: PORT,
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: PATH_TO_CHROME, // Screenshots require Chrome 60. Force Canary.
      args: ['--headless']
    }
  }
};

const browser = webdriverio.remote(opts).init();
const url = 'http://localhost:3090';

await browser.url(url);

console.log({addition});
// const title = await browser.getTitle();
// console.log(`Title: ${title}`);
const additionResult = await addition(browser);

// await browser.waitForText('#button_clear', 3000);
// const value = await browser.getText('.result');
// console.log(`Result : ${value}`); // outputs: some value

// await browser.url('https://www.chromestatus.com/features');

// const title = await browser.getTitle();
// console.log(`Title: ${title}`);

// await browser.waitForText('.num-features', 3000);
// let numFeatures = await browser.getText('.num-features');
// console.log(`Chrome has ${numFeatures} total features`);

// await browser.setValue('input[type="search"]', 'CSS');
// console.log('Filtering features...');
// await browser.pause(1000);

// numFeatures = await browser.getText('.num-features');
// console.log(`Chrome has ${numFeatures} CSS features`);

// const buffer = await browser.saveScreenshot('screenshot.png');
// console.log('Saved screenshot...');

chromedriver.stop();
browser.end();

return additionResult;

};



const run = async () => {
  const result = await test();
  return result;
}

export default {run};
