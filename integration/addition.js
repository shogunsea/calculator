
const additionTest = async (browser) => {
    await browser.click('#button_one');
    await browser.click('#button_plus');
    await browser.click('#button_two');
    await browser.click('#button_evaluate');

    const newValue = await browser.getText('.result');

    if (newValue === '3') {
      return 'success';
    } else {
      return 'fail';
    }
};

export default additionTest;
