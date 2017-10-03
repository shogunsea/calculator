
const testCases = [
  {
    actions: [5, 'percent'],
    result: '0.05',
  },
  {
    actions: [5, 'percent', '+', 2, '='],
    result: '2.05',
  },
  {
    actions: [5, '+', 2, 'percent', '='],
    result: '5.02',
  },
];

module.exports = testCases;
