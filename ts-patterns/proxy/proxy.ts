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

const person: Person = {
  name: "Gromit",
  age: 28,
  nation: "korea",
};

// 1
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

// 2
const handlerWithReflect: Handler = {
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

const personProxy = new Proxy(person, handler);
const personWithReflectProxy = new Proxy(person, handlerWithReflect);

export { person, handler };
