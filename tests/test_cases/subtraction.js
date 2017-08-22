
const testCases = [
  {
    actions: [1, '-', '='],
    result: '0',
  },
  {
    actions: [1, '-', '=', '='],
    result: '-1',
  },
  {
    actions: [1, '-', 3, '='],
    result: '-2',
  },
  {
    actions: [1, '-', '=', '='],
    result: '-1',
  },
  {
    actions: [1, '-', 2, '='],
    result: '-1',
  },
  {
    actions: [7, '-', 4, '='],
    result: '3',
  },
  {
    actions: [5, '-', 2, '=', '='],
    result: '1',
  }
];

module.exports = testCases;
