import Dog, { RealDog } from "../mixin";

describe("Mixin Test", () => {
  const dog = new Dog("gromit") as RealDog;

  test("Dog는 이름은 gromit이다.", () => {
    expect(dog.name).toBe("gromit");
  });

  test("Dog는 이름 외에 울고, 꼬리 흔들고, 놀고, 자고, 걸을 수 있다.", () => {
    expect(dog.name).toBe("gromit");
    expect(dog.bark()).toBe("왈왈!");
    expect(dog.wagTail()).toBe("꼬리흔들기!");
    expect(dog.play()).toBe("놀기!");
    expect(dog.walk()).toBe("걷기!");
    expect(dog.sleep()).toBe("잠자기!");
  });
});
