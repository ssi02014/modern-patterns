# ๐ป Proxy

## ๊ธฐ๋ณธ ๊ฐ๋

- ์ผ๋ฐ์ ์ผ๋ก Proxy๋ ์ด๋ค ์ด์ `๋๋ฆฌ์ธ`์ ๋ปํ๋ค. ๊ทธ ์ฌ๋๊ณผ ์ง์ ์ด์ผ๊ธฐํ๋ ๊ฒ ๋์ . ์ด์ผ๊ธฐ๋ฅผ ์ํ๋ ์ฌ๋์ ๋๋ฆฌ์ธ์๊ฒ ์ด์ผ๊ธฐํ๋๊ฒ์ด๋ค. JavaScript์์๋ ํด๋น ๊ฐ์ฒด๋ฅผ ์ง์  ๋ค๋ฃจ๋ ๊ฒ์ด ์๋๊ณ  `Proxy ๊ฐ์ฒด`์ ์ธํฐ๋ ์ํ๊ฒ ๋๋ค.
- Proxy ํจํด์ ์์ธํ ์์๋ณด๊ธฐ์ ์ ์ฐ์  ์๋ฐ์คํฌ๋ฆฝํธ Proxy ๊ฐ์ฒด์๋ํด์ ์์๋ณด์.

<br />

## Proxy ๊ฐ์ฒด

- ์๋ฐ์คํฌ๋ฆฝํธ์์ Proxy ๊ฐ์ฒด๋ฅผ ํ์ฉํ๋ฉด ํน์  ๊ฐ์ฒด์์ ์ธํฐ๋ ์์ ์กฐ๊ธ ๋ ์ปจํธ๋กค ํ  ์ ์๊ฒ ๋๋ค.
- Proxy๊ฐ์ฒด๋ ์ด๋ค ๊ฐ์ฒด์ ๊ฐ์ ์ค์ ํ๊ฑฐ๋ ์กฐํํ ๋ ๋ฑ์ ์ธํฐ๋ ์์ ์ง์  ์ ์ดํ  ์ ์๋ค.

<br />

### ๊ธฐ๋ณธ ๊ตฌ๋ฌธ

```js
new Proxy(target, handler);
```

- target: proxy์ ํจ๊ป ๊ฐ์ธ์ง target ๊ฐ์ฒด
- handler: ํ๋กํผํฐ๋ค์ด function์ธ ๊ฐ์ฒด์ด๋ค. ๋์์ด ์ํ๋  ๋, handler๋ proxy์ ํ๋์ ์ ์ํ๋ค.

<br />

### ๊ธฐ๋ณธ ์์ 

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

- ์ ์์ ๋ ํ๋กํผํฐ๊ฐ ์กด์ฌํ์ง ์์ ๋, ๊ธฐ๋ณธ๊ฐ์ ์ซ์ 37๋ก ๋ฆฌํด๋ฐ๋ ๊ฐ๋จํ ์์ ์ด๋ค.

<br />

## ์ฝ๋ ๋ฐ ์ฃผ์ ๋ด์ฉ

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

// person ๊ฐ์ฒด
const person: Person = {
  name: "Gromit",
  age: 28,
  nation: "korea",
};

// Proxy ๊ฐ์ฒด์ Handler
const handler: Handler = {
  get(obj, prop) {
    return obj[prop];
  },
  set(obj, prop, value) {
    obj[prop] = value;
    return true;
  },
};

// Proxy ์ธ์คํด์ค ์์ฑ
const personProxy = new Proxy(person, handler);

// ์ธํฐ๋ ์
personProxy.name = "minjae"; // set name
console.log(personProxy.name); // get name

export { person, handler };
```

- ์ฐ์  person์ด๋ผ๋ ๊ฐ์ฒด๋ฅผ ์์ฑํ๋ค. Proxy ํจํด์ ์ด person ๊ฐ์ฒด์ ์ง์  ์ธํฐ๋ ์ ํ๋ ๊ฒ ๋์  `Proxy ๊ฐ์ฒด์ ์ธํฐ๋ ์ํด์ผ ํ๋ค.`
- Proxy ์ธ์คํด์ค๋ฅผ ๋ง๋๋ ๊ฒ์ผ๋ก ์ฝ๊ฒ Proxy ๊ฐ์ฒด๋ฅผ ๋ง๋ค์ด ๋ผ ์ ์๋ค.
- Proxy ์์ฑ์์ ๋ ๋ฒ์งธ ์ธ์๋ ํธ๋ค๋ฌ๋ฅผ ์๋ฏธํ๋๋ฐ. ํธ๋ค๋ฌ ๊ฐ์ฒด์์ ์ธํฐ๋ ์์ ์ข๋ฅ์ ๋ฐ๋ฅธ ํน์  ๋์๋ค์ ์ ์ํ  ์ ์๋ค. ์ฌ๋ฌ ๋ฉ์๋๋ค์ ์ถ๊ฐํ  ์ ์๋๋ฐ, ์ผ๋ฐ์ ์ผ๋ก `get`๊ณผ `set`์ด๋ค.
  - get: ํ๋กํผํฐ์ `์ ๊ทผ`ํ๋ ค๊ณ  ํ  ๋ ์คํ
  - set: ํ๋กํผํฐ์ `๊ฐ์ ์์ `ํ๋ ค๊ณ  ํ  ๋ ์คํ

<br />

## ์ ํจ์ฑ ๊ฒ์ฌ

- Proxy๋ `์ ํจ์ฑ ๊ฒ์ฌ`๋ฅผ ๊ตฌํํ  ๋ ์ ์ฉํ๋ค. ์๋ ์๊ตฌ์ฌํญ ๋๋ก ์ฝ๋๋ฅผ ์์ ํด๋ณด์.
  - ์ฌ์ฉ์๋ person ๊ฐ์ฒด์ name ํ๋กํผํฐ๋ ๋น ๋ฌธ์์ด๋ก ์ด๊ธฐํ ํ  ์ ์๋ค. ๊ทธ๋ฆฌ๊ณ  ์ฌ์ฉ์๊ฐ person ๊ฐ์ฒด์ ์กด์ฌํ์ง ์๋ ํ๋กํผํฐ์ ์ ๊ทผํ๋ ค ํ๋ฉด ์๋ฌ๋ฅผ ๋์ ธ์ค๋ค.

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

<br />

## ํ์คํธ

- ์ง๊ธ๊น์ง ์์ฑํ ์ฝ๋์ ํ์คํธ ์ฝ๋๋ ๋ค์๊ณผ ๊ฐ๋ค.

```ts
import { person, handler } from "../proxy";

test("์ด๊ธฐ๊ฐ ์ด๋ฆ์ Gromit, ๋์ด 28, ๊ตญ๊ฐ korea", () => {
  const personProxy = new Proxy(person, handler);

  expect(personProxy.name).toBe("Gromit");
  expect(personProxy.age).toBe(28);
  expect(personProxy.nation).toBe("korea");
});

test("์ด๋ฆ์ Minjae๋ก ์ค์ ", () => {
  const personProxy = new Proxy(person, handler);

  personProxy.name = "Minjae";
  expect(personProxy.name).toBe("Minjae");
});

test("๋์ด๋ฅผ 28๋ก ์ค์ ", () => {
  const personProxy = new Proxy(person, handler);

  personProxy.age = 30;
  expect(personProxy.age).toBe(30);
});

test("๋น ํ๋กํผํฐ ์ ๊ทผ ์ ์๋ฌ ๋ฐ์", () => {
  const personProxy = new Proxy(person, handler);

  // Error ํ์คํธ ์ ํ (1)
  try {
    console.log(personProxy.job);
  } catch (error: any) {
    expect(error.message).toBe("This property doesn't seem to exist");
  }
});

test("์ด๋ฆ์ ๋น ๋ฌธ์์ด์ ์ ํจํ์ง ์์ ์๋ฌ ๋ฐ์", () => {
  const personProxy = new Proxy(person, handler);

  // Error ํ์คํธ ์ ํ (2)
  const getError = () => {
    personProxy.name = "";
  };
  expect(getError).toThrow();
});
```

<br />

## Reflect

- ์ถ๊ฐ์ ์ผ๋ก JavaScript๋ `Reflect`๋ผ๋ ๋นํธ์ธ ๊ฐ์ฒด๋ฅผ ์ ๊ณตํ๋๋ฐ Proxy์ ํจ๊ป ์ฌ์ฉํ๋ฉด ๋์ ๊ฐ์ฒด๋ฅผ ์ฝ๊ฒ ์กฐ์ํ  ์ ์๋ค.
- ์ง๊ธ๊น์ง ์์ ์์๋ Proxy์ ํธ๋ค๋ฌ ๋ด์์ `๊ดํธ ํ๊ธฐ๋ฒ([])`๋ฅผ ์ด์ฉํด์ ์ง์  ํ๋กํผํฐ๋ฅผ ์์ ํ๊ฑฐ๋ ์ฝ์ด๋ค์๋ค.
- ์ด๋ ๊ฒํ๋ ๋์ ์, Reflect ๊ฐ์ฒด๋ฅผ ์ฌ์ฉํ  ์ ์๋ค. Reflect ๊ฐ์ฒด์ ๋ฉ์๋๋ ํธ๋ค๋ฌ ๊ฐ์ฒด์ `๊ฐ์ ์ด๋ฆ์ ๋ฉ์๋(get, set)`๋ฅผ ๊ฐ์ง ์ ์๋ค.

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

## ์ ๋ฆฌ

- Proxy๋ ๊ฐ์ฒด์ ๋์์ `์ปค์คํฐ๋ง์ด์ง`ํ  ์ ์๋ ์ ์ฉํ ๊ธฐ๋ฅ์ด๋ค. Proxy๋ `์ ํจ์ฑ ๊ฒ์ฌ`, `ํฌ๋ฉํ`, `์๋ฆผ`, `๋๋ฒ๊น` ๋ฑ ์ ์ฉํ๊ฒ ์ฌ์ฉ๋๋ค.
- ํธ๋ค๋ฌ ๊ฐ์ฒด์์ Proxy๋ฅผ ๋๋ฌด ํค๋นํ๊ฒ ์ฌ์ฉํ๋ฉด ์ฑ์ ์ฑ๋ฅ์ ๋ถ์ ์ ์ธ ์ํฅ์ ์ค ์ ์๋ค. Proxy๋ฅผ ์ฌ์ฉํ  ๋ ์ฑ๋ฅ ๋ฌธ์ ๊ฐ ์๊ธฐ์ง ์์ ๋งํ ์ฝ๋๋ฅผ ์ฌ

<br />
