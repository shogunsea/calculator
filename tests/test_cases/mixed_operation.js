
const testCases = [
  {
    actions: [1, '+', '5', '+'],
    result: '6',
  },
  {
    actions: [1, '+', '5', '-'],
    result: '6',
  },
  {
    actions: [1, '+', '5', '*'],
    result: '5',
  },
  {
    actions: [1, '+', '5', '/'],
    result: '5',
  },
];

module.exports = testCases;
