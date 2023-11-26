import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Layout from "./Layout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="page">
      <Sidebar />
      {children}
    </Layout>
  );
};

export default MainLayout;
