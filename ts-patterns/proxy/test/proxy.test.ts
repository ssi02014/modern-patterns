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
