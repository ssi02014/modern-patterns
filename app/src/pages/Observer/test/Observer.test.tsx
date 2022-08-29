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
