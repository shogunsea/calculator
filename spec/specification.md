# Calc Widgets

Plain calculator mirco app in HTML/CSS/JS.

## Visual Specification
- Result display panel
- Input panel
  - Number and dots
  - Action key: clear, negation, percent
- Operations Panel: +, -, *, /, =: each of these will trigger evaluation

## Functional Specification
- Support basic calculation.
- Support continuous evaluation.
- Support clear, negation, percentise of current result/input value.
- Components that handles view model communication --- react view?


### Basic calculation use case
- 1 + 1 = 2: input one number, then operator, then the other number, hitting '=' evaluates the result

### Continuous evaluation use case
- 1 + 1 * 2 + 3 = 7: Eager evaluation, current result will be first operand, next input will be the second operand.


## Implementaion design

Overall guideliens:
- Functional implementation should be totally independent of UI, but two components should be easily connected through an interface.
- TDD: wirte tests to describe expected behavior of each components first.
- Integrate with Circle CI.

Ideas to try:
- Use Headless Chrome for integration tests.
- Use Electron for cross platform apps.
- Use Redux for state management.


Action items:
- Seperate view and functional components
- Setup build system, tests pipeline.

### Layout sketching
![screenshot](https://raw.githubusercontent.com/shogunsea/calculator/master/spec/calculator.png)
