# 💻 Singleton

## 기본 개념

- Singleton `1회`에 한하여 인스턴스화가 가능하며 전역에서 접근 가능한 클래스를 지칭한다.
- 만들어진 Singleton 인스턴스는 앱 전역에서 공유되기 때문에 앱의 `전역 상태`를 관리하기 적합하다.

<br />

## 코드 및 주요 내용

```ts
// counter.ts
let instance: Object | null = null;
let counter = 0;

class Counter {
  constructor() {
    // 새로운 인스턴스 생성을 방지
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  init() {
    counter = 0;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// 인스턴스의 프로퍼티를 덮어쓰는 것을 방지
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

- Singleton은 인스턴스를 `단 한번`만 만들어야된다. 따라서, 인스턴스를 여러 번 생성 할 수 있으면 Singleton 패턴 조건에 만족하지 않는 것이다.
- 위 예제에서는 `instance`라는 변수를 만들어 Counter 클래스의 `생성자(constructor)`에서 instance 변수가 새로 생성된 인스턴스를 가리키도록 했다. 그리고 instance 변수를 검사하는 것으로 새로운 인스턴스 생성을 막을 수 있는 것이다.
- 그리고 `Object.freeze`를 이용해서 객체를 사용하는 쪽에서 직접 객체를 수정할 수 없도록 설정한다. 이를 통해 Counter 인스턴스의 프로퍼티를 덮어쓰는 실수를 예방한다.

<br />

## 테스팅

```js
// counter.test.ts
import Counter from "./counterTest";

test("counter 초기값 0", () => {
  expect(Counter.getCount()).toBe(0);
});

test("1 increment", () => {
  Counter.increment();
  expect(Counter.getCount()).toBe(1);
});

test("3 increment", () => {
  Counter.init(); // 초기화
  Counter.increment();
  Counter.increment();
  Counter.increment();
  expect(Counter.getCount()).toBe(3);
});

test("1 decrement", () => {
  Counter.init(); // 초기화
  Counter.decrement();
  expect(Counter.getCount()).toBe(-1);
});
```

- Singleton 패턴으로 구현된 코드를 테스트하는 것은 까다롭다.
  - 왜냐하면 인스턴스를 매번 생성할 수 없기 때문에 모든 테스트들을 이전 테스트에서 만들어진 `전역 인스턴스`를 수정할 수 밖에 없다.
  - 예제 같은 경우에는 `counterTest.ts`라는 테스트용 ts파일을 생성해 Counter 인스턴스를 생성하고 export했다.
- 테스트들이 실행에 순서가 생기게 되면 작은 수정사항이 전체 테스트의 실패로 이어질 수 있다. 일반적으로 하나의 테스트가 끝나면 인스턴스의 변경사항들을 `초기화`해 주어야 한다.

<br />

## 장점과 단점

### 🙆🏻‍♂️ 장점

- 인스턴스를 하나만 만들도록 강제하면 꽤 많은 `메모리 공간을 절약`할 수 있다.
  - 매번 새로운 인스턴스를 만들어 메모리 공간을 차지하도록 하는 대신, 앱 전체에서 사용 가능한 하나의 인스턴스를 저장하기 위한 메모리를 사용한다.

<br />

### 🙅🏻‍♂️ 단점

- Singleton은 안티 패턴 혹은 자바스크립트에서는 하지 말아야 한다고 언급되곤 한다.
  - Java와 C++ 같은 다양한 언어들을 JavaScript처럼 객체를 직접적으로 만들 수 없다. 이런 객체지향 프로그래밍 언어에서는 객체를 만들기 위한 클래스를 꼭 작성해야 한다.
  - JavaScript에서는 클래스를 작성하지 않아도 객체를 만들 수 있기 때문에 위의 예제는 약간 오버 엔지니어링이라 볼 수 있다.

<br />

## 객체 리터럴 코드

```ts
// counterLiteral.ts
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);
export { counter };
```

- 위에 코드는 class로 구현했던 코드를 단순히 객체 리터럴로 구현한 모습이다.

<br />

## 전역 동작

- Singleton 인스턴스는 `앱의 전체`에서 참조할 수 있어야 한다. 전역 스코프에서 전역 변수를 접근할 수 있는 한. 해당 변수는 앱 전체에서 접근할 수 있기 때문에. 전역 변수는 반드시 같은 동작을 구현하는 데 사용해야 한다.
- 만약 전역 변수가 잘못된 판단으로 올바르지 않게 만들어진 경우. 잘못된 값으로 덮어쓰여질 수 있으며. 이 변수를 참조하는 구현들이 모두 예외를 발생시킬 수 있다.
- ES2015에선 전역변수를 생성하는게 일반적이지 않은 것이. 새로 만들어진 `let`, `const` 키워드들은 변수를 `블록 스코프` 내에 선언하게 하여. 실수로 전역에 변수를 선언하는것을 예방해 주기 때문이다. 또 새로운 `module 시스템`은 export 구문과 import 구분으로 전역 객체를 수정하지 않고 모듈 내에서 전역으로 쓸 수 있는 변수를 만들게 해 준다.
- 그러나 Singleton 패턴은 일반적으로 앱에 전역 상태를 위해 사용한다. 코드의 여러 부분에서 `수정가능한 하나의 객체를 직접 접근하도록 설계하면 예외가 발생하기 쉬워진다.`
- 보통 어떤 코드들은 데이터를 읽어들이는 부분을 위해 전역 상태를 수정하기도 한다. 이 경우 `실행 순서`가 중요해진다. 데이터가 만들어지지 않았는데 사용할 수는 없기 때문이다.
- 앱의 규모가 커지고 전역 상태를 참조하는 컴포넌트가 많아지며 서로를 참조하는 상황에서는 `데이터의 흐름을 파악하기 어려워진다.`

<br />

## 리액트의 상태 관리

- React에선 전역 상태 관리를 위해 Singleton 객체를 만드는 것 대신, `Redux`나 `Context API`를 자주 사용한다.
- Singleton과 유사해 보이지만 Singleton은 인스턴스의 값을 `직접 수정`할 수 있는 반면에, 언급한 도구들은 `읽기 전용 상태`를 제공한다.
- Redux를 사용할 땐 오직 컴포넌트에서 `dispatch`를 통해 넘긴 `action`에 대해 실행된 `reducer(순수함수)`를 통해서만 상태를 업데이트할 수 있다.

<br />
