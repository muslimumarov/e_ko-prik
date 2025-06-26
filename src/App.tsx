import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Route from "./router";
import Navbar from "./layouts/base/navbar/Navbar.tsx";
import { Login } from "./layouts/auth/login/Login.tsx";
import TestLoader from "./TestModeBanner.tsx";

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // Har safar til o'zgarsa, komponent qayta render bo'ladi
  useEffect(() => {
    const handleLangChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on("languageChanged", handleLangChange);

    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, [i18n]);
  if (isLoginPage) {
    return (
      <div className="min-h-screen">
        <TestLoader />
        <Navbar />
        <Login />
      </div>
    );
  }

  return <Route key={currentLang} />;
};

export default App;
