let count = 0;

// Singleton 패턴은 자스에서 안티패턴
// 리터럴로 객체를 생성해서 사용하는게 더 깔끔함
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
