# Calculator App Algorithm Analysis
This app mimics behavior of the iOS default calculator app, specifically its basic version.

## Interal states of a calculator instance
To definte the internal states of an calculator instance, it's important to make sure the scope of its functionality is clear: should it only support basic arithmetic operations or mixed operation as well?
Basic arithmetic operations being addition, subtraction, multiplication and division.
Mixed operation being a mix calculation of any four arithmetic operations.
If the scope is to only support basic operation, the internal states would be quite simple, all you need to keep track of is the current operator, current result as left operand, and new input operand as the right operand.
```
this.currentResult;
this.leftOperand;
this.rightOperand;
```

## Action cause state change

## What should happen when...
  #### ...input is an operand

  #### ...input is an operator
