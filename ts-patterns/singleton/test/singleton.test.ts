import Counter from "./singletonTestInstance";

beforeEach(() => {
  // clear
  Counter.init();
});

test("counter 초기값 0", () => {
  expect(Counter.getCount()).toBe(0);
});

test("1 증가", () => {
  Counter.increment();
  expect(Counter.getCount()).toBe(1);
});

test("3 증가", () => {
  Counter.increment();
  Counter.increment();
  Counter.increment();
  expect(Counter.getCount()).toBe(3);
});

test("1 감소", () => {
  Counter.decrement();
  expect(Counter.getCount()).toBe(-1);
});
