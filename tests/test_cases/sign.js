
const testCases = [
  {
    actions: [5, 'sign'],
    result: '-5',
  },
  {
    actions: [5, 'sign', '+', 2, '='],
    result: '-3',
  },
  {
    actions: [5, '+', 2, 'sign', '='],
    result: '3',
  },
];

module.exports = testCases;
