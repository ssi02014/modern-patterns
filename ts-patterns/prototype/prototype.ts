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

// play 메서드 추가
Dog.prototype.play = () => {
  return "놀자!";
};

const dog1 = new SuperDog("Daisy");

export default Dog;
