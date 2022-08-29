import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

const customRender = (ui: ReactElement, options = {}) => {
  return render(ui, { wrapper: BrowserRouter, ...options });
};

// re-export
export * from "@testing-library/react";

// override render method
export { customRender as render };
