# 💻 Proxy

## 기본 개념

- 일반적으로 Proxy는 어떤 이의 `대리인`을 뜻한다. 그 사람과 직접이야기하는 것 대신. 이야기를 원하는 사람의 대리인에게 이야기하는것이다. JavaScript에서도 해당 객체를 직접 다루는 것이 아니고 `Proxy 객체`와 인터렉션하게 된다.
- Proxy 패턴을 자세히 알아보기전에 우선 자바스크립트 Proxy 객체에대해서 알아보자.

<br />

## Proxy 객체

- 자바스크립트에서 Proxy 객체를 활용하면 특정 객체와의 인터렉션을 조금 더 컨트롤 할 수 있게 된다.
- Proxy객체는 어떤 객체의 값을 설정하거나 조회할때 등의 인터렉션을 직접 제어할 수 있다.

### 기본 구문

```js
new Proxy(target, handler);
```

- target: proxy와 함께 감싸진 target 객체
- handler: 프로퍼티들이 function인 객체이다. 동작이 수행될 때, handler는 proxy의 행동을 정의한다.

<br />

### 기본 예제

```js
const handler = {
  get(target, name) {
    return name in target ? target[name] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 37
```

- 위 예제는 프로퍼티가 존재하지 않을 때, 기본값은 숫자 37로 리턴받는 간단한 예제이다.

<br />

## 코드 및 주요 내용

```ts
// Type
type Getter = (obj: Person, prop: string) => void;
type Setter = (obj: Person, prop: string, value: number | string) => boolean;

interface Person {
  name: string;
  age: number;
  nation: string;
  [key: string]: number | string;
}

interface Handler {
  get: Getter;
  set: Setter;
}

// person 객체
const person: Person = {
  name: "Gromit",
  age: 28,
  nation: "korea",
};

// Proxy 객체의 Handler
const handler: Handler = {
  get(obj, prop) {
    return obj[prop];
  },
  set(obj, prop, value) {
    obj[prop] = value;
    return true;
  },
};

// Proxy 인스턴스 생성
const personProxy = new Proxy(person, handler);

// 인터렉션
personProxy.name = "minjae"; // set name
console.log(personProxy.name); // get name

export { person, handler };
```

- 우선 person이라는 객체를 생성한다. Proxy 패턴은 이 person 객체와 직접 인터렉션 하는 것 대신 `Proxy 객체와 인터렉션해야 한다.`
- Proxy 인스턴스를 만드는 것으로 쉽게 Proxy 객체를 만들어 낼 수 있다.
- Proxy 생성자의 두 번째 인자는 핸들러를 의미하는데. 핸들러 객체에서 인터렉션의 종류에 따른 특정 동작들을 정의할 수 있다. 여러 메서드들을 추가할 수 있는데, 일반적으로 `get`과 `set`이다.
  - get: 프로퍼티에 `접근`하려고 할 때 실행
  - set: 프로퍼티에 `값을 수정`하려고 할 때 실행

<br />

## 유효성 검사

- Proxy는 `유효성 검사`를 구현할 때 유용하다. 아래 요구사항 대로 코드를 수정해보자.
  - 사용자는 person 객체의 name 프로퍼티는 빈 문자열로 초기화 할 수 없다. 그리고 사용자가 person 객체에 존재하지 않는 프로퍼티에 접근하려 하면 에러를 던져준다.

```ts
//...

const handler: Handler = {
  get(obj, prop) {
    if (!obj[prop]) {
      throw new Error("This property doesn't seem to exist");
    }
    return obj[prop];
  },
  set(obj, prop, value) {
    if (prop === "name" && !value) {
      throw new Error("You need to provide a valid name.");
    }
    obj[prop] = value;
    return true;
  },
};

const personProxy = new Proxy(person, handler);

console.log(personProxy.job); // Error
personProxy.name = ""; // Error
```

## 테스트

- 지금까지 작성한 코드의 테스트 코드는 다음과 같다.

```ts
import { person, handler } from "../proxy";

test("초기값 이름은 Gromit, 나이 28, 국가 korea", () => {
  const personProxy = new Proxy(person, handler);
  expect(personProxy.name).toBe("Gromit");
  expect(personProxy.age).toBe(28);
  expect(personProxy.nation).toBe("korea");
});

test("이름을 Minjae로 설정", () => {
  const personProxy = new Proxy(person, handler);
  personProxy.name = "Minjae";
  expect(personProxy.name).toBe("Minjae");
});

test("나이를 28로 설정", () => {
  const personProxy = new Proxy(person, handler);
  personProxy.age = 30;
  expect(personProxy.age).toBe(30);
});

test("빈 프로퍼티 접근 시 에러 발생", () => {
  const personProxy = new Proxy(person, handler);

  // Error 테스트 유형 (1)
  try {
    console.log(personProxy.job);
  } catch (error: any) {
    expect(error.message).toBe("This property doesn't seem to exist");
  }
});

test("이름에 빈 문자열은 유효하지 않아 에러 발생", () => {
  const personProxy = new Proxy(person, handler);

  // Error 테스트 유형 (2)
  const getError = () => {
    personProxy.name = "";
  };
  expect(getError).toThrow();
});
```

<br />

## Reflect

- 추가적으로 JavaScript는 `Reflect`라는 빌트인 객체를 제공하는데 Proxy와 함께 사용하면 대상 객체를 쉽게 조작할 수 있다.
- 지금까지 예제에서는 Proxy의 핸들러 내에서 `괄호 표기법([])`를 이용해서 직접 프로퍼티를 수정하거나 읽어들였다.
- 이렇게하는 대신에, Reflect 객체를 사용할 수 있다. Reflect 객체의 메서드는 핸들러 객체와 `같은 이름의 메서드(get, set)`를 가질 수 있다.

```ts
const handler: Handler = {
  get(obj, prop) {
    const data = Reflect.get(obj, prop);

    if (!data) {
      throw new Error("This property doesn't seem to exist");
    }
    return data;
  },
  set(obj, prop, value) {
    if (prop === "name" && !value) {
      throw new Error("You need to provide a valid name.");
    }
    Reflect.set(obj, prop, value);
    return true;
  },
};
```

<br />

## 정리

- Proxy는 객체의 동작을 `커스터마이징`할 수 있는 유용한 기능이다. Proxy는 `유효성 검사`, `포메팅`, `알림`, `디버깅` 등 유용하게 사용된다.
- 핸들러 객체에서 Proxy를 너무 헤비하게 사용하면 앱의 성능에 부정적인 영향을 줄 수 있다. Proxy를 사용할 땐 성능 문제가 생기지 않을 말한 코드를 사

<br />
