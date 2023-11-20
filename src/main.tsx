import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// pages
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { AuthProvider } from "./providers/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
