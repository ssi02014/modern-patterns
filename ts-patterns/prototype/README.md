# 💻 Prototype

## 기본 개념

- Prototype 패턴은 `동일 타입의 여러 객체들이 프로퍼티를 공유`할 때 유용하게 사용한다.
- Prototype은 JavaScript 객체의 기본 속성이므로 `Prototype Chain`을 활용 할 수 있다.
- 하나의 앱을 만들 때, `동일한 타입의 여러 객체`를 만들어내곤 한다. ES6의 클래스의 여러 인스턴스를 만들어 낼 때 유용하게 사용할 수 있다.
- 아래 예제는 `Dog` 클래스를 정의한 것이고, 프로퍼티로 `name`을 가지고 있고, `bark` 메서드를 갖고 있다.

<br />

## 코드 및 주요 내용

```ts
class Dog {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public bark() {
    return `왈왈!`;
  }
}

const dog1 = new Dog("쫀덕이");
const dog2 = new Dog("코코");
const dog3 = new Dog("그로밋");
```

- ES6클래스를 사용하면 모든 프로퍼티는 `클래스 자체`에 선언되며, 위의 코드에서 bark 메서드는 `prototype`에 추가된다.
- 생성자의 `prototype` 프로퍼티 혹은`Object.getPrototypeOf()`의 인자로 인스턴스를 넣으면서 `Prototype 객체`를 확인 할 수 있다.

```
__proto__의 getter 함수는 객체의 내부[[Prototype]]을 노출한다.
하지만, __proto__ 는 비 표준이다. Object.getPrototypeOf()가 표준이므로 이를 사용한다.

__proto__의 setter 함수는 객체의 [[Prototype]]을 변경할 수 있다.
하지만, setter 함수를 통해 [[Prototype]]을 바꾸는 것은 권장되지 않는다. 다른 코드들에 영향을 줄 수 있고, 성능에 악영향을 끼친다.
대신, Object.create()를 사용하여 원하는 [[Prototype]]으로 새로운 객체를 만드는 것이 좋다.
```

```js
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(Object.getPrototypeOf(dog1));
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```

- 어떤 인스턴스던 `[[Prototype]]`은 Prototype 객체를 가리킨다. 객체에 없는 프로퍼티에 접근하는 경우 JavaScript는 접근하려는 프로퍼티가 나타날때 까지 `prototype chain`을 거슬러 올라간다.

<br />

### Dog 생성자의 `prototype`

![스크린샷 2022-08-28 오후 7 18 46](https://user-images.githubusercontent.com/64779472/187069044-206259e7-114a-4578-8bc2-a819ed900534.png)

<br />

### 인스턴스 dog의 `[[Prototype]]`

![스크린샷 2022-08-28 오후 7 19 39](https://user-images.githubusercontent.com/64779472/187069084-80358962-611b-4a1a-807b-c3a3ed7a4352.png)

<br />

![스크린샷 2022-08-28 오후 7 36 15](https://user-images.githubusercontent.com/64779472/187069674-d4235d89-21ff-422b-9d20-7a64c38b15f3.png)

<br />

## Prototype Chain

- Prototype 패턴은 `객체들이 같은 프로퍼티를 가져야 하는 경우` 유용하게 쓰일 수 있다.
- 중복된 프로퍼티들이 존재하는 객체를 매번 생성하기 보다, Prototype에 프로퍼티를 추가하면 모든 인스턴스들이 Prototype 객체를 활용할 수 있다.
- 모든 인스턴스들이 Prototype에 접근 가능하기 때문에. `인스턴스를 만든 뒤에도 Prototype에 프로퍼티를 추가할 수 있다.`
- 위 예제에서 강아지는 bark 메서드만 존재했지만, `play` 메서드도 추가해보자. Prototype 객체에 play 프로퍼티를 추가하여 가능하다.

```ts
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

const dog1 = new Dog("쫀덕이");
const dog2 = new Dog("코코");
const dog3 = new Dog("그로밋");

Dog.prototype.play = () => {
  console.log("놀자~");
};
```

<br />

![스크린샷 2022-08-28 오후 8 15 29](https://user-images.githubusercontent.com/64779472/187071320-f3ac7c68-2c0f-4971-bc15-8def20079394.png)

- Prototype `Chain` 단어 처럼 Prototype은 한 단계 이상도 존재할 수 있다. 하지만 Prototype 객체 자체도 `[[Prototype]]` 속성을 가질 수 있다.
- 이제 다른 타입의 강아지를 만들어 보자. 이 강아지는 `Dog`의 속성을 모두 가지고 있지만 하늘을 날 수 있다.
- 이 슈퍼 강아지는 Dog 클래스를 `상속(extends)`받아 `fly` 메서드를 구현하면 된다.

```ts
class SuperDog extends Dog {
  constructor(name: string) {
    super(name);
    this.name = name;
  }

  public fly() {
    return `날자!!`;
  }
}

const dog1 = new SuperDog("Daisy");

console.log(dog1.bark()); // 왈왈!
console.log(dog1.fly()); // 날자!!
```

![스크린샷 2022-08-28 오후 8 19 55](https://user-images.githubusercontent.com/64779472/187071482-1b4573ea-8f0f-412d-b396-dd07d85ed8f3.png)

- Prototype `Chain`이라 불리우는 이유가 명확해졌을 것이다. 현재 객체에 없는 프로퍼티에 접근하려 하는 경우 JavaScript는 같은 이름의 프로퍼티를 찾을 때 까지 `재귀적`으로 객체의 `[[Prototype]]`를 거슬러 올라가게 된다. (예제 이미지에서는 `__proto__`)

<br />

## Object.create

- `Object.create` 메서드는 Prototype으로 쓰일 객체를 인자로 받아 새로운 객체를 만들어낸다.
- 아래 예제에서 인스턴스 `pet1` 자체적으로는 아무런 프로퍼티도 없지만 `dog` 객체를 Prototype으로 사용하기 때문에 `bark` 메서드를 사용할 수 있다.

```ts
// Object.create
const dog = {
  bark() {
    return `왈왈!`;
  },
};

const pet1 = Object.create(dog);

console.log(pet1.bark()); // 왈왈!
```

- `Object.create` 는 단순히 객체가 다른 객체로부터 프로퍼티를 상속받을 수 있게 해 준다. 실행 결과로 생성되는 객체는 Prototype Chain으로 인해 인자로 넘어갔던 객체의 프로퍼티를 활용할 수 있는 것이다.

<br />

## 테스트

```ts
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

test("Dog 클래스로 인스턴스를 생성할 시, 인자로 '그로밋'을 넣으면 name의 값은 '그로밋'이며, 메서드 bark를 호출하면 '왈왈!'이 반환된다.", () => {
  const dog = new Dog("그로밋");

  // Dog 클래스의 prototype이 dog의 Prototype Chain에 존재한다.
  expect(dog instanceof Dog).toBeTruthy();

  expect(dog.name).toBe("그로밋");
  expect(dog.bark()).toBe("왈왈!");
});

test("인스턴스들은 Prototype 객체를 접근할 수 있으며, 인스턴스 생성 후에도 프로퍼티를 추가 할 수 있다", () => {
  const dog = new Dog("그로밋");

  // play 메서드 추가
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
```

<br />

## 정리

- Prototype 패턴은 어떤 객체가 다른 객체의 프로퍼티를 `상속`받을 수 있도록 해 준다. Prototype Chain을 통해 해당 객체에 프로퍼티가 직접 선언되어 있지 않아도 되므로 `메서드 중복을 줄일 수 있고` 이는 `메모리 절약`으로 이어진다.

<br />
