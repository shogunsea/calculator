
const testCases = [
  {
    actions: [1, '×', '='],
    result: '1',
  },
  {
    actions: [1, '×', '=', '='],
    result: '1',
  },
  {
    actions: [2, '×', '='],
    result: '4',
  },
  {
    actions: [2, '×', '=', '='],
    result: '8',
  },
  {
    actions: [1, '×', 3],
    result: '3',
  },
  {
    actions: [1, '×', 2, '='],
    result: '2',
  },
  {
    actions: [4, '×', 7, '='],
    result: '28',
  },
  {
    actions: [5, '×', 2, '=', '='],
    result: '20',
  }
];

module.exports = testCases;
