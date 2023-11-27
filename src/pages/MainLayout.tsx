import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Layout from "./Layout";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const { isAuth } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    if (!isAuth) return navigator("/");
  });

  if (isAuth) {
    return (
      <Layout className="page">
        <Sidebar />
        <Outlet />
      </Layout>
    );
  }
};

export default MainLayout;
