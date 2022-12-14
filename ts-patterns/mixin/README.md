# ๐ป Mixin

## ๊ธฐ๋ณธ ๊ฐ๋

- Mixin์ `์์ ์์ด` ์ด๋ค ๊ฐ์ฒด๋ ํด๋์ค์ ์ฌ์ฌ์ฉ ๊ฐ๋ฅํ ๊ธฐ๋ฅ์ ์ถ๊ฐํ  ์ ์๋ ๊ฐ์ฒด์ด๋ค.
- Mixin์ ๋จ๋์ผ๋ก ์ฌ์ฉํ  ์ ์๊ณ  ์์ ์์ด `๊ฐ์ฒด`๋ `ํด๋์ค์ ๊ธฐ๋ฅ์ ์ถ๊ฐ`ํ๋ ๋ชฉ์ ์ผ๋ก ์ฌ์ฉ๋๋ค.

<br />

### ๋ฆฌ์กํธ์์ Mixin (๐โโ๏ธ ๋น์ถ!)

- ES6 ํด๋์ค ๋ฌธ๋ฒ์ด ์๊ฐ๋๊ธฐ ์ ์ Mixin์ React์์ ์ปดํฌ๋ํธ์ ๊ธฐ๋ฅ์ ์ถ๊ฐํ๊ธฐ ์ํด ์ข์ข ์ฌ์ฉ๋์๋ค.
- ํ์ง๋ง React๊ฐ๋ฐํ์ [mixin์ ์ฌ์ฉํ์ง ๋ง์ ์ฃผ์ธ์.](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) ๋ผ๋ ๊ธ๊ณผ ํจ๊ป ์ปดํฌ๋ํธ์ Mixin์ด `๋ณต์ก๋๋ฅผ ์ฆ๊ฐ`์ํค๊ณ  `์ฌ์ฌ์ฉํ๊ธฐ ์ด๋ ต๊ฒ ๋ง๋ ๋ค`๊ณ  ์ด์ผ๊ธฐํ๋ค. ๋์  React๊ฐ๋ฐํ์ ์ง๊ธ์ ํ์ ์ํด ๋์ฒด ๊ฐ๋ฅํ์ง๋ง `๊ณ ์ฐจ ์ปดํฌ๋ํธ`๋ฅผ ์ฌ์ฉํ๊ธธ ๊ถ์ฅํ์๋ค.

<br />

### Window์์์ Mixin

- Window ๊ฐ์ฒด๋ `WindowOrWorkerGlobalScope`์ `WindowEventHandler` ์ Mixin์ผ๋ก ๊ตฌ์ฑ๋์ด ์๊ธฐ ๋๋ฌธ์ `setTimeout`, `setInterval`, `indexedDB`, `isSecureContext` ๊ฐ์ ํ๋กํผํฐ๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.
- `WindowOrWorkerGlobalScope`๋ Mixin์ด๊ธฐ ๋๋ฌธ์ ํด๋น Mixin์ ์ง์  ์ฌ์ฉํ ์๋ ์๋ค.

<br />

## ์ฝ๋ ๋ฐ ์ฃผ์ ๋ด์ฉ

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
  bark: () => "์์!",
  wagTail: () => "๊ผฌ๋ฆฌํ๋ค๊ธฐ!",
  play: () => "๋๊ธฐ!",
};

Object.assign(Dog.prototype, dogFunctionality);

const dog = new Dog("Daisy") as RealDog;

console.log(dog.name); // Daisy
console.log(dog.bark()); // ์์!
console.log(dog.wagTail()); // ๊ผฌ๋ฆฌํ๋ค๊ธฐ!
console.log(dog.play()); // ๋๊ธฐ!
```

- ์์ ์์ ์ฒ๋ผ Dog ํด๋์ค๋ `name` ํ๋กํผํฐ ์ธ์ ๋ค๋ฅธ ํ๋กํผํฐ๋ฅผ ๊ฐ์ง๊ณ  ์์ง ์๋ค.
- ๊ทธ๋ฌ๋ ๊ฐ์์ง๋ ์ด๋ฆ ์ธ์๋ ์ง๊ฑฐ๋ ๊ผฌ๋ฆฌ๋ฅผ ํ๋ค๊ฑฐ๋ ์ ๋๊ฒ ๋ ์ ์์ด์ผ ํ๋ค. ์ด๋ฅผ, Dog ํด๋์ค์ ์ง์  ์ ์ํ๋ ๋์  bark, wagTail, play๋ฅผ ํ๋กํผํฐ๋ก ๊ฐ์ง Mixin์ ๋ง๋ค ์ ์๋ค.

<br />

### Mixin ์์

- ์์ ์์ด ๊ฐ์ฒด์ ๊ธฐ๋ฅ์ ์ถ๊ฐํ  ์ ์์ง๋ง Mixin ์์ฒด๋ ์์์ ํ  ์ ์๋ค.
- ๋๋ถ๋ถ์ ํฌ์ ๋ฅ๋ ๊ฑท๊ฑฐ๋, ์ ์ ์ ์ ์๋ค. ์ด๋ฌํ ๊ธฐ๋ฅ์ ๊ฐ์ง animalFunctionality Mixin์ ๋ง๋ค์ด๋ณด์.

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
  walk: () => "๊ฑท๊ธฐ!",
  sleep: () => "์ ์๊ธฐ!",
};

// (*)
const dogFunctionality = {
  bark: () => "์์!",
  wagTail: () => "๊ผฌ๋ฆฌํ๋ค๊ธฐ!",
  play: () => "๋๊ธฐ!",
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
console.log(dog.bark()); // ์์!
console.log(dog.wagTail()); // ๊ผฌ๋ฆฌํ๋ค๊ธฐ!
console.log(dog.play()); // ๋๊ธฐ!
console.log(dog.walk()); // ๊ฑท๊ธฐ!
console.log(dog.sleep()); // ์ ์๊ธฐ!
```

- ์ด์  ๋ง๋ค์ด์ง๋ Dog ํด๋์ค์ ์ธ์คํด์ค๋ค์ ๋ชจ๋ `walk`, `sleep` ๋ฉ์๋๋ฅผ ์ฌ์ฉํ  ์ ์๋ค.

<br />

## ํ์คํธ

```ts
import Dog, { RealDog } from "../mixin";

describe("Mixin Test", () => {
  const dog = new Dog("gromit") as RealDog;

  test("Dog๋ ์ด๋ฆ์ gromit์ด๋ค.", () => {
    expect(dog.name).toBe("gromit");
  });

  test("Dog๋ ์ด๋ฆ ์ธ์ ์ธ๊ณ , ๊ผฌ๋ฆฌ ํ๋ค๊ณ , ๋๊ณ , ์๊ณ , ๊ฑธ์ ์ ์๋ค.", () => {
    expect(dog.name).toBe("gromit");
    expect(dog.bark()).toBe("์์!");
    expect(dog.wagTail()).toBe("๊ผฌ๋ฆฌํ๋ค๊ธฐ!");
    expect(dog.play()).toBe("๋๊ธฐ!");
    expect(dog.walk()).toBe("๊ฑท๊ธฐ!");
    expect(dog.sleep()).toBe("์ ์๊ธฐ!");
  });
});
```

<br />

## ์ฅ์ ๐โโ๏ธ ๊ณผ ๋จ์ ๐โโ๏ธ

- Mixin์ ์์์ ํ์ง ์๊ณ ๋ ๊ฐ์ฒด์ ํ๋กํ ํ์์ ํน์  ๊ธฐ๋ฅ๋ค์ ์ฃผ์ํ  ์ ์๋ค.
- ๋ค๋ง ๊ฐ์ฒด์ ํ๋กํ ํ์์ ์ง์  ์์ ํ๋ ๊ฒ์ ์๋ํ์ง ์์ ํ๋กํ ํ์ ํ๋กํผํฐ์ ์์ ์ผ๋ก ์ด์ด์ง ์ ์์ด ์ฃผ์๊ฐ ํ์ํ๋ค.
- ๋ํ, ๋ฆฌ์กํธ์์๋ ์ถ์ฒํ์ง ์๋ ํจํด์ด๋ค

<br />
