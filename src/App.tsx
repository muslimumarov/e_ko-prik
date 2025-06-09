import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";

const App: React.FC = () => {
  const location = useLocation();
  const hideNavbarRouts = ["/login"];
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src="/images/IMG_2016.JPG" alt="img" className="home-video" />
      {!hideNavbarRouts.includes(location.pathname) && <Navbar />}
      <Route /> {/* Sahifalarni boshqaradi */}
    </div>
  );
};

export default App;
