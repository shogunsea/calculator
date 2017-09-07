
const isPlusMinus = (operator) => {
  return operator === 'plus' || operator === 'minus';
};

const isMultiplyDivide = (operator) => {
  return operator === 'multiply' || operator === 'divide';
};

export {isPlusMinus, isMultiplyDivide};
