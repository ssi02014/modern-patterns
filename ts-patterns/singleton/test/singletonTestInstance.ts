let instance: Counter | null = null;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  public getInstance() {
    return this;
  }

  public getCount() {
    return counter;
  }

  public init() {
    counter = 0;
  }

  public increment() {
    return ++counter;
  }

  public decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
