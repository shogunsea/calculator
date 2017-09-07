
const testCases = [
  {
    actions: [1, '/', '='],
    result: '1',
  },
  {
    actions: [1, '/', 3, '='],
    result: '0.333333333333333',
  },
  {
    actions: [1, '/', '=', '='],
    result: '1',
  },
  {
    actions: [1, '/', 2, '='],
    result: '0.5',
  },
  {
    actions: [4, '/', 7, '='],
    result: '0.571428571428571',
  },
  {
    actions: [5, '/', 2, '=', '='],
    result: '1.25',
  },
];

module.exports = testCases;
