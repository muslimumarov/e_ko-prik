// Main.tsx
import React from "react";
import SearchInput from "../../../components/searchInput/SearchInput.tsx";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MainBoxList from "./MainBoxList.tsx";
import PartnersAndBenefits from "../article/PartnersAndBenefits.tsx";

const Main: React.FC = () => {
  const { t } = useTranslation();

  const boxes = [
    {
      title: t("interactiveMap"),
      description: t("xarita"),
      path: "/map/myMap",
      img: "images/xaritaUzb.png",
      isPublic: true,
    },
    {
      title: t("monitoring"),
      description: t("monitor"),
      path: "http://90.156.199.181:8088/",
      img: "/images/monitoring.4eab7f5f.png",
      isPublic: false,
      isExternal: true,
    },
    {
      title: t("E-Xodim"),
      description: t("xodim"),
      path: "https://hrm.kuprikqurilish.uz/",
      img: "images/recruitment.png",
      isExternal: true,
    },
    {
      title: t("archive"),
      description: t("arxiv"),
      path: "/archive",
      img: "/images/arxiv2.png",
      isPublic: true,
    },
    {
      title: t("E-Ombor"),
      description: t("ombor"),
      path: "/warehouse",
      img: "/images/ombor.png",
      isPublic: false,
    },
    {
      title: t("surveillanceCameras"),
      description: t("camera"),
      path: "/camera",
      img: "/images/camera2.png",
      isPublic: false,
    },
  ];

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden ">
        <img
          src="/images/IMG_2016.jpg"
          alt="img"
          className=" absolute inset-0 z-0 size-full object-cover"
        />
        <div className="container  relative z-40 mx-auto my-40 px-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="max-w-2xl">
              <h1 className=" font-black text-amber-400 mobil330:mb-3 mobil330:text-3xl sm:text-4xl lg:text-6xl">
                {t("E-Bridge")}
              </h1>
            </div>
            <div className="max-w-2xl">
              <SearchInput />
            </div>
          </div>
          <MainBoxList boxes={boxes} />
          <Outlet />
        </div>
      </div>
      <PartnersAndBenefits />
    </div>
  );
};

export default Main;
