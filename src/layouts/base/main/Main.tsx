import React from "react";
import SearchInput from "../../../components/searchInput/SearchInput.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../../store/useAuthStore.ts";
import { toast } from "react-toastify";
import { LockKeyhole } from "lucide-react";
import PartnersAndBenefits from "../article/PartnersAndBenefits.tsx";

interface Box {
  title: string;
  path: string;
  img: string;
  isPublic?: boolean;
  isExternal?: boolean;
}

const Main: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const boxes: Box[] = [
    {
      title: t("interactiveMap"),
      path: "/map/myMap",
      img: "images/xaritaUzb.png",
      isPublic: true,
    },
    {
      title: t("monitoring"),
      path: "/monitoring",
      img: "/images/monitoring.4eab7f5f.png",
      isPublic: false,
    },
    {
      title: t("E-Xodim"),
      path: "https://hrm.kuprikqurilish.uz/",
      img: "images/recruitment.png",
      isExternal: true,
    },
    {
      title: t("archive"),
      path: "/archive",
      img: "/images/archive.png",
      isPublic: true,
    },
    {
      title: t("E-Ombor"),
      path: "/warehouse",
      img: "/images/server-data.png",
      isPublic: false,
    },
    {
      title: t("surveillanceCameras"),
      path: "/camera",
      img: "/images/security-camera.png",
      isPublic: false,
    },
  ];

  const handleClick = (box: Box) => {
    if (!box.isPublic && !isAuthenticated) {
      toast.warning("Sizga ruxsat yo‘q");
      navigate("/login");
      return;
    }

    if (box.isExternal) {
      window.open(box.path, "_blank");
    } else {
      navigate(box.path);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden">
        <img
          src="/images/IMG_2016.JPG"
          alt="img"
          className=" absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="container relative z-40 mx-auto mb-40 mt-40 px-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="max-w-2xl">
              <h1 className="font-bold text-white mobil330:mb-3 mobil330:text-3xl sm:text-4xl lg:text-5xl">
                {t("E-Bridge")}
              </h1>
            </div>
            <div className="max-w-2xl">
              <SearchInput />
            </div>
          </div>
          <div className="mt-20 grid bg-[url('/your-bg.jpg')] bg-cover bg-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {boxes.map((box, index) => {
                const isLocked = !isAuthenticated && !box.isPublic;

                return (
                  <div
                    key={index}
                    onClick={() => handleClick(box)}
                    className="relative flex h-64 cursor-pointer items-center justify-center rounded-xl bg-white/10 p-6 text-center text-xl font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 sm:w-[290px] md:w-[390px] lg:w-[350px] xl:w-[400px]"
                  >
                    {/* Hoverda ko‘rsatiladigan blok */}
                    {isLocked && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/60 text-white opacity-0 transition-opacity hover:opacity-100">
                        <LockKeyhole size={40} color="red" className="mb-2" />
                        <p className="text-sm">{t("AccessDenied")}</p>
                      </div>
                    )}

                    <img
                      src={box.img}
                      alt={box.title}
                      className="absolute bottom-0 right-0 w-60 object-cover"
                    />
                    <span className="absolute left-3 top-3 z-20 text-2xl font-bold">
                      {box.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <PartnersAndBenefits />
    </div>
  );
};

export default Main;
