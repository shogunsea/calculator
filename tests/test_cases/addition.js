
const testCases = [
  {
    actions: [1, '+', '='],
    result: '2',
  },
  {
    actions: [1, '+', 3],
    result: '3',
  },
  {
    actions: [1, '+', '=', '='],
    result: '3',
  },
  {
    actions: [1, '+', 2, '='],
    result: '3',
  },
  // {
  //   actions: [1, '+', 2, '+'],
  //   result: '3',
  // },
  // {
  //   actions: [1, '+', 2, '+', 4, '='],
  //   result: '7',
  // },
  // {
  //   actions: [1, '+', 2, '+', 4, '+'],
  //   result: '7',
  // },
  // {
  //   actions: [4, '+', 7, '='],
  //   result: '11',
  // },
  // {
  //   actions: [5, '+', 2, '=', '='],
  //   result: '9',
  // }
];

module.exports = testCases;
