import React, { Fragment, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BridgesResponseArxiv } from "./interfaces/arxiv.interfaces.tsx";
import { GetBridgeCard } from "./arxiv-api/arxiv-api.tsx";
import TitleBanner from "../../core/components/banner/TitleBanner.tsx";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Archive: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    region: "",
    district: "",
    holat: "",
    search: "",
  });
  const [card, setCard] = useState<BridgesResponseArxiv | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    GetBridgeCard(currentUrl)
      .then((data) => {
        setCard(data);
      })
      .catch((err) => console.log(err));
  }, [currentUrl]);

  const tabItems = {
    path: "/archive",
    label: t("Arxiv Malumotlari"),
    children: [
      { path: "archiveDetails", label: t("archiveDetails"), icon: Globe },
    ],
  };
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/archive/archiveDetails/${id}`);
  };
  const activeChild = tabItems.children.find((child) =>
    location.pathname.includes(`/archive/${child.path}`),
  );
  const isDetailView = /\/archive\/(archiveDetails)\/\d+/.test(
    location.pathname,
  );

  return (
    <Fragment>
      {!isDetailView && (
        <TitleBanner
          title={tabItems.label}
          basePath={tabItems.path}
          activeChild={activeChild}
        />
      )}
      <div className="container mx-auto ">
        <div className=" grid w-full gap-4 p-4 mobil330:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
          <select
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.region}
            onChange={(e) =>
              setFilters((f) => ({ ...f, region: e.target.value }))
            }
          >
            <option id={"1"} value="1">
              Toshkent viloyati
            </option>
            <option id={"11"} value="1">
              Toshkent shahri
            </option>
            <option id={"1"} value="1">
              Qoraqolpog'iston Respublikasi
            </option>
            <option id={"1"} value="1">
              Sirdaryo
            </option>
            <option id={"1"} value="1">
              Namangan
            </option>
            <option id={"1"} value="1">
              Farg'ona
            </option>
            <option id={"1"} value="1">
              Andijon
            </option>
            <option id={"1"} value="1">
              Jizzax
            </option>
            <option id={"12"} value="1">
              Samarqand
            </option>
            <option id={"1"} value="1">
              Surxondaryo
            </option>
            <option id={"1"} value="1">
              Qashqadaryo
            </option>
            <option id={"1"} value="1">
              Navoiy
            </option>
            <option id={"1"} value="1">
              Buxoro
            </option>
            <option id={""} value="1">
              Xorazm
            </option>
          </select>
          <select
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.district}
            onChange={(e) =>
              setFilters((f) => ({ ...f, district: e.target.value }))
            }
          >
            <option value="">All Districts</option>
            <option value="1">Yunusobod</option>
          </select>
          <select
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.holat}
            onChange={(e) =>
              setFilters((f) => ({ ...f, holat: e.target.value }))
            }
          >
            <option value="">All Holat</option>
            <option value="yaxshi">Yaxshi</option>
            <option value="yomon">Yomon</option>
          </select>
          <div className="relative w-full max-w-xs">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3  "
              placeholder="Qidiruv..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="my-10  flex  flex-col justify-between">
          <div className="grid grid-cols-1 gap-4 px-5 pb-7 sm:grid-cols-2 md:grid-cols-4">
            {card?.results?.map((box) => (
              <div
                key={box.id}
                className="rounded-xl border border-white/20 shadow-md  backdrop-blur-md dark:bg-blue-950"
                onClick={() => handleClick(box.id)}
              >
                <img
                  className={"h-32 w-full rounded-t-md"}
                  src={box.images?.image || "/no-image.png"}
                  alt={box.name}
                />
                <h2 className={"p-4 text-amber-300 dark:text-[#f35a02]"}>
                  {box.name.length > 30
                    ? box.name.slice(0, 69) + "..."
                    : box.name}
                </h2>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                card?.previous &&
                setCurrentUrl(
                  card.previous.replace(import.meta.env.VITE_API_URL, ""),
                )
              }
              disabled={!card?.previous}
              className="rounded-lg border border-gray-300  bg-white px-4 py-2 shadow backdrop-blur-md disabled:opacity-50"
            >
              Oldingi
            </button>
            <button
              onClick={() =>
                card?.next &&
                setCurrentUrl(
                  card.next.replace(import.meta.env.VITE_API_URL, ""),
                )
              }
              disabled={!card?.next}
              className="rounded-lg border border-gray-300  bg-white px-4 py-2 shadow backdrop-blur-md disabled:opacity-50"
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Archive;
