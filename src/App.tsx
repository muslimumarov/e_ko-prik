// App.tsx
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";
import Footer from "./layouts/base/footer/Footer.tsx";
import PartnersAndBenefits from "./layouts/base/article/PartnersAndBenefits.tsx";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Route />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src="/images/IMG_2016.JPG" alt="img" className="home-video" />
      <Navbar />
      <Route />
      <PartnersAndBenefits />
      <Footer />
    </div>
  );
};

export default App;
