// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar.tsx";
import Footer from "../footer/Footer.tsx";
import TestLoader from "../../../TestModeBanner.tsx";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <TestLoader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
