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
import MainLayout from "./pages/MainLayout";
import CreateBook from "./pages/CreateBook";
import Categories from "./pages/Categories";
import Collections from "./pages/Collections";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route
            path="/home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/create-book"
            element={
              <MainLayout>
                <CreateBook />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/categories"
            element={
              <MainLayout>
                <Categories />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/collections"
            element={
              <MainLayout>
                <Collections />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/notifications"
            element={
              <MainLayout>
                <Notifications />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
