class Dog {
  name: string;
  play?: () => void;

  constructor(name: string) {
    this.name = name;
  }

  bark() {
    return `왈왈!`;
  }
}

class SuperDog extends Dog {
  constructor(name: string) {
    super(name);
    this.name = name;
  }

  fly() {
    return `날자!!`;
  }
}

const dog1 = new SuperDog("Daisy");

console.log(dog1.bark()); // 왈왈!
console.log(dog1.fly()); // 날자!!

// Object.create
const dog = {
  bark() {
    return `왈왈!`;
  },
};

const pet1 = Object.create(dog);

console.log(pet1.bark()); // 왈왈!

export { Dog, SuperDog };
