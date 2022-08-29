type ObserverFunc = (data?: string) => void;

class Observable {
  public observers: ObserverFunc[];

  constructor() {
    this.observers = [];
  }

  public subscribe(func: any) {
    this.observers = [...this.observers, func];
  }

  public unsubscribe(func: any) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  public notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }

  public init() {
    this.observers = [];
  }
}

const observable = new Observable();
export default observable;
