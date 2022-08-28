class Dog {
  public name: string;
  public play?: () => void;

  constructor(name: string) {
    this.name = name;
  }

  public bark() {
    return `왈왈!`;
  }
}

class SuperDog extends Dog {
  constructor(name: string) {
    super(name);
  }

  public fly() {
    return `날자!!`;
  }
}

const dog1 = new SuperDog("Daisy");

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// Object.create
const dog = {
  bark() {
    return `왈왈!`;
  },
};

const pet1 = Object.create(dog);

export default Dog;
