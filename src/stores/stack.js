
class Stack {
  constructor() {
    this.data = [];
  }

  push(value) {
    if (value !== undefined) {
      this.data.push(value);
    }
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }

    const value = this.data.pop();
    return value;
  }

  size() {
    return this.data.length;
  }

  // TODO: this is added for compatability with previous written cocde
  // if this is really needed, change the class name to Deque
  // if not just get rid of usage of such method calls
  shift() {
    return this.data.shift();
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return;
    }

    return this.data[this.size() - 1];
  }

  contains(...values) {
    let foundAny = false;

    for (let value of values) {
      if (this.data.indexOf(value) !== -1) {
        foundAny = true;
        break;
      }
    }

    return foundAny;
  }
}

export default Stack;
