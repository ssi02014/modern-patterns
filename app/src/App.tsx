import React, { useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ObserverPage from "./pages/Observer";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const menuStyle = useMemo(() => {
    return {
      padding: "0",
      marginBottom: "20px",
      listStyle: "none",
      display: "flex",
      gap: "20px",
    };
  }, []);

  return (
    <>
      <ul style={menuStyle}>
        <li>
          <Link to={"/"}>홈</Link>
        </li>
        <li>
          <Link to={"/observer"}>옵저버 패턴</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/observer" element={<ObserverPage />} />
      </Routes>
    </>
  );
}

export default App;
