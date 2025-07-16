// Main.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/searchInput/SearchInput.tsx";
import MainBoxList from "./MainBoxList.tsx";
import Article from "../article/Article.tsx";
import { useBoxes } from "./main-items.tsx";

const Main: React.FC = () => {
  const { t } = useTranslation();
  const allBoxes = useBoxes();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBoxes = allBoxes.filter(
    (box) =>
      box.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      box.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden ">
        <img
          src="/images/IMG_2016.jpg"
          alt="img"
          className=" absolute inset-0 z-0 size-full object-cover"
        />
        <div className="container relative z-40 mx-auto my-40 px-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="max-w-2xl">
              <h1 className="font-black text-amber-400 mobil330:mb-3 mobil330:text-3xl sm:text-4xl lg:text-6xl">
                {t("E-Bridge")}
              </h1>
            </div>
            <div className="max-w-2xl">
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>

          {/* 🔍 Faqat qidiruvga mos kelgan boxlar */}
          <MainBoxList boxes={filteredBoxes} />

          <Outlet />
        </div>
      </div>
      <Article />
    </div>
  );
};

export default Main;
