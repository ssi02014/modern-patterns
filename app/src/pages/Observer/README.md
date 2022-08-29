# 💻 Observer

## 기본 개념

- Observer 패턴에서 특정 객체를 구독할 수 있는데. 구독하는 주체를 `Observer`라 하고. 구독 가능한 객체를 `Observable`이라 한다.
- 이벤트가 발생할 때 마다 Observable은 모든 Observer에게 이벤트를 전파한다.
- Observable 객체는 보통 4가지 주요 특징을 포함한다
  - `observers` : 이벤트가 발생할때마다 전파할 Observer들의 배열
  - `subscribe()` : Observer를 Observer 배열에 `추가`한다.
  - `unsubscribe()` : Observer 배열에서 Observer를 `제거`한다.
  - `notify()` : 등록된 모든 Observer들에게 이벤트를 `전파`한다

<br />

## 코드 및 주요 내용

```ts
type ObserverFunc = (data?: string) => void;

class Observable {
  private observers: ObserverFunc[];

  constructor() {
    this.observers = [];
  }

  public subscribe(func: any) {
    this.observers = [...this.observers, func];
  }

  public unsubscribe(func: any) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  public notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }

  public init() {
    this.observers = [];
  }
}

const observable = new Observable();
export default observable;
```

- 위 코드에서 `subscribe` 메서드를 통해 Observer를 등록하고 반대로 `unsubscribe` 를 통해 해지할 수 있다. 그리고 `notify` 메서드를 통해 모든 Observer에게 이벤트를 전파한다.
- 아래 코드는 이런 Observable 객체를 이용한 간단한 App이다.

```tsx
import React, { useEffect } from "react";
import observable from "./observable";
import { ToastContainer, toast } from "react-toastify";

function handleClick() {
  observable.notify("User clicked button!");
}

function handleChange() {
  observable.notify("User checked checkbox!");
}

function handleCancel() {
  observable.unsubscribe(logger); // 구독 취소
  observable.unsubscribe(toastify); // 구독 취소
}

// Observer
function logger(data: string) {
  console.log(`${Date.now()} ${data}`);
}

// Observer
function toastify(data: string) {
  toast(data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: false,
    autoClose: 2000,
  });
}

observable.subscribe(logger); // Observer 구독
observable.subscribe(toastify); // Observer 구독

const ObserverPage = () => {
  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
      <input type="checkbox" onChange={handleChange} />
      <button onClick={handleClick}>구독 취소</button>
      <ToastContainer />
    </div>
  );
};

export default ObserverPage;
```

- 사용자가 `handleClick` 혹은 `handleChange` 함수를 호출할 때 마다 Observable의 `notify` 를 호출한다.
- notify 메서드는 등록된 모든 `Observer(logger, toastify)`에게 handleClick 혹은 handleChange 에서 전달된 데이터를 포함한 이벤트를 전파한다.
- 그리고 `handleCancel` 함수를 통해 각각 logger, toastify를 구독 취소 한다.

<br />

## 테스트

```ts
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "../../../../testUtils/test-utils";
import ObserverPage from "..";
import observable from "../observable";

describe("Observer React 기능 테스트", () => {
  test("기본 버튼, 리셋 버튼, 체크박스 렌더링 및 초기 테스트", () => {
    render(<ObserverPage />);

    // Element 가져오기
    const toastButton = screen.getByRole("button", {
      name: "Click me!",
    });
    const cancelButton = screen.getByRole("button", {
      name: "구독 취소",
    });
    const toastCheckbox = screen.getByRole("checkbox", {
      name: "체크박스",
    });

    expect(toastButton).toHaveTextContent("Click me!");
    expect(cancelButton).toHaveTextContent("구독 취소");
    expect(toastCheckbox).not.toBeChecked();
  });

  test("toast button 클릭 후에 toast popup render", async () => {
    render(<ObserverPage />);

    const toastButton = screen.getByRole("button", {
      name: "Click me!",
    });

    // click event
    fireEvent.click(toastButton);

    await waitFor(() => {
      const toastPopup = screen.getByRole("toast");
      expect(toastPopup).toHaveTextContent("User clicked button!");
    });
  });

  test("toast checkbox 클릭 후에 toast popup render", async () => {
    render(<ObserverPage />);

    const toastCheckbox = screen.getByRole("checkbox", {
      name: "체크박스",
    });

    // click event
    fireEvent.click(toastCheckbox);

    await waitFor(() => {
      const toastPopup = screen.getByRole("toast");
      expect(toastPopup).toHaveTextContent("User checked checkbox!");
    });
  });

  test("버튼, 체크박스 연속 클릭해서 toast popup render", async () => {
    render(<ObserverPage />);

    const toastButton = screen.getByRole("button", {
      name: "Click me!",
    });
    const toastCheckbox = screen.getByRole("checkbox", {
      name: "체크박스",
    });

    // click event
    fireEvent.click(toastCheckbox);
    fireEvent.click(toastButton);

    await waitFor(() => {
      const toastPopup = screen.getAllByRole("toast");
      expect(toastPopup).toHaveLength(2);
    });
  });
});

describe("Observer 단위 테스트", () => {
  let arr: string[] = []; // 테스트 배열

  const Observer1 = (data: string) => {
    arr.push(data);
  };
  const Observer2 = (data: string) => {
    arr.push(data);
  };

  beforeAll(() => {
    // 테스트를 위한 초기화
    observable.init();
    arr = [];
  });

  test("구독 등록, 취소 테스트", () => {
    observable.subscribe(Observer1);
    expect(observable.observers).toHaveLength(1);

    observable.unsubscribe(Observer1);
    expect(observable.observers).toHaveLength(0);
  });

  test("이벤트 전파 테스트", () => {
    observable.subscribe(Observer1);
    observable.subscribe(Observer2);

    observable.notify("hi");
    expect(arr).toHaveLength(2);
  });
});
```

<br />

## 정리

- Observer 패턴은 다양하게 활용할 수 있지만 `비동기 호출` 혹은 `이벤트 기반 데이터`를 처리할 때 매우 유용하다.
- 만약 어떤 컴포넌트가 특정 데이터의 다운로드 완료 `알림`을 받기 원하거나, 사용자가 메시지 보드에 새로운 메시지를 게시했을 때 모든 멤버가 알림을 받거나 하는 등의 상황 말이다.

<br />

### 장점

- Observer 패턴을 사용하는 것도 관심사의 분리와 단일 책임의 원칙을 강제하기 위한 좋은 방법이다.
- Observer 객체는 Observable 객체와 강제 결합되어있지 않고 언제든지 분리될 수 있다.
- Observable 객체는 `이벤트 모니터링`의 역할을 갖고. Observer는 받은 `데이터를 처리`하는 역할을 갖게 된다.

### 단점

- Observer가 복잡해지면 모든 Observer들에 알림을 전파하는 데 성능 이슈가 발생할 수 있다.

<br />
