# 💻 Mixin

## 기본 개념

- Mixin은 `상속 없이` 어떤 객체나 클래스에 재사용 가능한 기능을 추가할 수 있는 객체이다.
- Mixin은 단독으로 사용할 순 없고 상속 없이 `객체`나 `클래스에 기능을 추가`하는 목적으로 사용된다.

<br />

### 리액트에서 Mixin (🙅‍♂️ 비추!)

- ES6 클래스 문법이 소개되기 전에 Mixin은 React에서 컴포넌트에 기능을 추가하기 위해 종종 사용되었다.
- 하지만 React개발팀은 [mixin을 사용하지 말아 주세요.](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) 라는 글과 함께 컴포넌트의 Mixin이 `복잡도를 증가`시키고 `재사용하기 어렵게 만든다`고 이야기했다. 대신 React개발팀은 지금은 훅에 의해 대체 가능하지만 `고차 컴포넌트`를 사용하길 권장했었다.

<br />

### Window에서의 Mixin

- Window 객체는 `WindowOrWorkerGlobalScope`와 `WindowEventHandler` 의 Mixin으로 구성되어 있기 때문에 `setTimeout`, `setInterval`, `indexedDB`, `isSecureContext` 같은 프로퍼티를 사용할 수 있다.
- `WindowOrWorkerGlobalScope`는 Mixin이기 때문에 해당 Mixin을 직접 사용할수는 없다.

<br />

## 코드 및 주요 내용

```ts
interface DefaultDog {
  readonly name: string;
}

interface RealDog extends DefaultDog {
  bark: () => void;
  wagTail: () => void;
  play: () => void;
}

class Dog implements DefaultDog {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => "왈왈!",
  wagTail: () => "꼬리흔들기!",
  play: () => "놀기!",
};

Object.assign(Dog.prototype, dogFunctionality);

const dog = new Dog("Daisy") as RealDog;

console.log(dog.name); // Daisy
console.log(dog.bark()); // 왈왈!
console.log(dog.wagTail()); // 꼬리흔들기!
console.log(dog.play()); // 놀기!
```

- 위에 예제처럼 Dog 클래스는 `name` 프로퍼티 외에 다른 프로퍼티를 가지고 있지 않다.
- 그러나 강아지는 이름 외에도 짖거나 꼬리를 흔들거나 신나게 놀 수 있어야 한다. 이를, Dog 클래스에 직접 정의하는 대신 bark, wagTail, play를 프로퍼티로 가진 Mixin을 만들 수 있다.

<br />

### Mixin 상속

- 상속 없이 객체에 기능을 추가할 수 있지만 Mixin 자체는 상속을 할 수 있다.
- 대부분의 포유류는 걷거나, 잠을 잘 수 있다. 이러한 기능을 가진 animalFunctionality Mixin을 만들어보자.

```ts
interface DefaultDog {
  readonly name: string;
}

// (*)
interface Animal {
  walk: () => void;
  sleep: () => void;
}

// (*)
interface RealDog extends DefaultDog, Animal {
  bark: () => void;
  wagTail: () => void;
  play: () => void;
}

class Dog implements DefaultDog {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// (*)
const animalFunctionality = {
  walk: () => "걷기!",
  sleep: () => "잠자기!",
};

// (*)
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

Object.assign(dogFunctionality, animalFunctionality); // // (*)
Object.assign(Dog.prototype, dogFunctionality);

const dog = new Dog("Daisy") as RealDog;

console.log(dog.name); // Daisy
console.log(dog.bark()); // 왈왈!
console.log(dog.wagTail()); // 꼬리흔들기!
console.log(dog.play()); // 놀기!
console.log(dog.walk()); // 걷기!
console.log(dog.sleep()); // 잠자기!
```

- 이제 만들어지는 Dog 클래스의 인스턴스들은 모두 `walk`, `sleep` 메서드를 사용할 수 있다.

<br />

## 테스트

```ts
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
```

<br />

## 장점🙆‍♂️ 과 단점🙅‍♂️

- Mixin은 상속을 하지 않고도 객체의 프로토타입에 특정 기능들을 주입할 수 있다.
- 다만 객체의 프로토타입을 직접 수정하는 것은 의도하지 않은 프로토타입 프로퍼티의 수정으로 이어질 수 있어 주의가 필요하다.
- 또한, 리액트에서는 추천하지 않는 패턴이다

<br />
