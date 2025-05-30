import React from "react";
import Logo from "../../../../public/images/Logo-Gold.png";
import gerb from "../../../../public/images/home-gerb.0379468a.svg";
import flag from "../../../../public/images/download.png";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../../../core/components/darkMode/ThemeToggle.tsx";
import LanguageSelector from "../../../core/components/language/LanguageSelector.tsx";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="fixed left-0 top-0 z-[9999] w-full bg-white/10 shadow-md backdrop-blur dark:bg-blue-950">
      <div className="container mx-auto flex justify-between px-4 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="no-copy">
            <a href="#" className="flex items-center justify-center gap-5">
              <img
                src={gerb}
                alt="Ko'prik qurulish"
                className=" size-10 object-cover mobil330:hidden sm:block" // 15x1 px
              />
              <img
                src={flag}
                alt="Ko'prik qurulish"
                className="h-14 mobil330:hidden sm:block" // 150x10 px
              />
              <img src={Logo} alt="Ko'prik qurulish" className="h-12" />
            </a>
          </div>
          <div className="no-copy flex items-center gap-6 dark:text-white md:order-2">
            <LanguageSelector />
            {/*<Notification />*/}
            <ThemeToggle />
            <Button
              className="no-copy flex  max-h-10  max-w-[18.125rem] items-center justify-center border-transparent
                              hover:scale-105  focus:ring-0 "
            >
              {t("Login")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
