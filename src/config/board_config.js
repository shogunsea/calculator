'use strict';

// Over engineered config.. probably not gonna need this.
/**
 * Button config, this file can be used for:
 * 1. Rendering HTML
 * 2. Binding event handlers
 *
 */

const boardConfig = {
  operandPanel: [
    {
      name: "row_one",
      content: [
        {
          name: 'clear',
          value: 'AC',
        },
        {
          name: 'sign',
          value: '+/-',
        },
        {
          name: 'percent',
          value: '%',
        }
      ],
    },
    {
      name: "row_two",
      content: [
        {
          name: 'seven',
          value: '7',
        },
        {
          name: 'eight',
          value: '8',
        },
        {
          name: 'nine',
          value: '9',
        },
      ],
    },
    {
      name: "row_three",
      content: [
        {
          name: 'four',
          value: '4',
        },
        {
          name: 'five',
          value: '5',
        },
        {
          name: 'six',
          value: '6',
        },
      ],
    },
    {
      name: "row_four",
      content: [
        {
          name: 'one',
          value: '1',
        },
        {
          name: 'two',
          value: '2',
        },
        {
          name: 'three',
          value: '3',
        },
      ],
    },
    {
      name: "row_five",
      content: [
        {
          name: 'zero',
          value: '0',
        },
        {
          name: 'dot',
          value: '.',
        },
      ]
    },
  ],
  operatorPanel: [
    {
      name: "row_one",
      content: [
        {
          name: 'divide',
          value: '÷',
        },
      ],
    },
    {
      name: "row_two",
      content: [
        {
          name: 'multiply',
          value: '×',
        },
      ],
    },
    {
      name: "row_three",
      content: [
        {
          name: 'minus',
          value: '-',
        },
      ],
    },
    {
      name: "row_four",
      content: [
        {
          name: 'plus',
          value: '+',
        },
      ],
    },
    {
      name: "row_five",
      content: [
        {
          name: 'evaluate',
          value: '=',
        },
      ],
    }
  ],
};

const buttonIDs = [
  "button_clear",
  "button_sign",
  "button_percent",
  "button_seven",
  "button_eight",
  "button_nine",
  "button_four",
  "button_five",
  "button_six",
  "button_one",
  "button_two",
  "button_three",
  "button_zero",
  "button_dot",
  "button_divide",
  "button_multiply",
  "button_minus",
  "button_plus",
  "button_evaluate",
];

export default {boardConfig, buttonIDs};
