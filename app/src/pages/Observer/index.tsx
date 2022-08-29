import React from "react";
import observable from "./observable";
import { ToastContainer, toast } from "react-toastify";

function handleClick() {
  observable.notify("User clicked button!");
}

function handleChange() {
  observable.notify("User checked checkbox!");
}

function handleCancel() {
  observable.unsubscribe(logger);
  observable.unsubscribe(toastify);
}

// Observer
function logger(data: string) {
  return `${Date.now()} ${data}`;
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
      <label htmlFor="checkbox">체크박스</label>
      <input id="checkbox" type="checkbox" onChange={handleChange} />
      <button onClick={handleCancel}>구독 취소</button>
      <ToastContainer role="toast" />
    </div>
  );
};

export default ObserverPage;
