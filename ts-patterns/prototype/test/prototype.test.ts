import Dog from "../prototype";

// 상속
class SuperDog extends Dog {
  constructor(name: string) {
    super(name);
  }

  public fly() {
    return `날자!`;
  }
}

test("Dog 생성자의 프로퍼티 name과 메서드 bark 가 존재한다", () => {
  const dog = new Dog("그로밋");

  // Dog 클래스의 prototype이 dog의 Prototype Chain에 존재한다.
  expect(dog instanceof Dog).toBeTruthy();

  expect(dog.name).toBe("그로밋");
  expect(dog.bark()).toBe("왈왈!");
});

test("인스턴스들은 Prototype 객체를 접근할 수 있으며 인스턴스 생성 후에도 프로퍼티를 추가 할 수 있다", () => {
  const dog = new Dog("그로밋");

  Dog.prototype.play = () => {
    return "놀자!";
  };

  expect(dog.play && dog.play()).toBe("놀자!");
});

test("상속받으면 부모 클래스에 정의된 프로퍼티를 갖는다.", () => {
  const superDog = new SuperDog("그로밋");

  // Dog, SuperDog 클래스의 prototype이 superDog의 Prototype Chain에 존재한다.
  expect(superDog instanceof Dog).toBeTruthy();
  expect(superDog instanceof SuperDog).toBeTruthy();

  expect(superDog.name).toBe("그로밋");
  expect(superDog.bark()).toBe("왈왈!");
  expect(superDog.fly()).toBe("날자!");
});
