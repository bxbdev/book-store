import React from "react";

type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const Layout = ({ className, children }: LayoutProps) => {
  return <div className={`wrap ${className}`}>{children}</div>;
};

export default Layout;
