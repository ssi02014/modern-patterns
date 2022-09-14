interface DefaultDog {
  readonly name: string;
}

interface Animal {
  walk: () => string;
  sleep: () => string;
}

export interface RealDog extends DefaultDog, Animal {
  bark: () => string;
  wagTail: () => string;
  play: () => string;
}

class Dog implements DefaultDog {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const animalFunctionality = {
  walk: () => "걷기!",
  sleep: () => "잠자기!",
};

const dogFunctionality = {
  bark: () => "왈왈!",
  wagTail: () => "꼬리흔들기!",
  play: () => "놀기!",
  walk() {
    super.walk();
  },
  sleep() {
    super.sleep();
  },
};

Object.assign(dogFunctionality, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality);

const dog = new Dog("Daisy") as RealDog;

dog.name; // Daisy
dog.bark(); // 왈왈!
dog.wagTail(); // 꼬리흔들기!
dog.play(); // 놀기!
dog.walk(); // 걷기!
dog.sleep(); // 잠자기!

export default Dog;
