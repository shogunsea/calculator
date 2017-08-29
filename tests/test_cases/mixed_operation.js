
const testCases = [
  {
    actions: [1, '+', 5, '+'],
    result: '6',
  },
  {
    actions: [1, '+', 5, '-'],
    result: '6',
  },
  {
    actions: [1, '+', 5, '*'],
    result: '5',
  },
  {
    actions: [1, '+', 5, '/'],
    result: '5',
  },
  {
    actions: [1, '+', 5, '*', 2],
    result: '2',
  },
  {
    actions: [1, '+', 5, '*', 2, '='],
    result: '11',
  },
  {
    actions: [1, '*', 5, '+', 2, '='],
    result: '7',
  },
  {
    actions: [1, '+', 5, '+', 2, '='],
    result: '8',
  },
  {
    actions: [1, '+', 5, '*', 2, '+'],
    result: '11',
  },
  {
    actions: [1, '+', 5, '*', 2, '/'],
    result: '2',
  },
  {
    actions: [1, '+', 5, '*', 2, '/', 2],
    result: '2',
  },
  // {
  //   actions: [1, '+', 5, '*', 2, '/', 2, '='],
  //   result: '6',
  // },
  // {
  //   actions: [1, '+', 5, '*', 2, '/', 2, '+'],
  //   result: '6',
  // },
];

module.exports = testCases;
