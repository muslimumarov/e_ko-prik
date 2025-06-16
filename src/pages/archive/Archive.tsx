import React, { Fragment, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BridgesResponseArxiv } from "./interfaces/arxiv.interfaces.tsx";
import { GetBridgeCard } from "./arxiv-api/arxiv-api.tsx";
import { useNavigate } from "react-router-dom";

const Archive: React.FC = () => {
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

  const navigate = useNavigate();

  // HandleClick funksiyasi id bilan archiveDetails sahifasiga o‘tadi
  const handleClick = (id: number) => {
    navigate(`/archive/${id}`);
  };

  return (
    <Fragment>
      <div className="container relative top-24 mx-auto ">
        <h1
          className={
            "mb-9 mt-14 text-center font-bold text-amber-200 dark:text-[#f35a02] mobil330:text-[18px] sm:text-5xl"
          }
        >
          Arxiv Malumotlar
        </h1>
        <div className=" mb-9 grid w-full gap-4 p-4 mobil330:grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
          {/* Selectlar qismi */}
          <select
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.region}
            onChange={(e) =>
              setFilters((f) => ({ ...f, region: e.target.value }))
            }
          >
            {/* Options */}
            <option value="1">Toshkent viloyati</option>
            <option value="2">Toshkent shahri</option>
            <option value="3">Qoraqolpog'iston Respublikasi</option>
            <option value="4">Sirdaryo</option>
            <option value="5">Namangan</option>
            <option value="6">Farg'ona</option>
            <option value="7">Andijon</option>
            <option value="8">Jizzax</option>
            <option value="9">Samarqand</option>
            <option value="10">Surxondaryo</option>
            <option value="11">Qashqadaryo</option>
            <option value="12">Navoiy</option>
            <option value="13">Buxoro</option>
            <option value="14">Xorazm</option>
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
              className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3"
              placeholder="Qidiruv..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>
        </div>

        <div className=" mb-28 flex flex-col justify-between ">
          <div className="grid grid-cols-1 gap-4 px-5 pb-7   mobil330:px-10 sm:h-full  sm:grid-cols-2 sm:px-4 md:grid-cols-4">
            {card?.results?.map((box) => (
              <div
                key={box.id}
                className="mobil330:h-35 cursor-pointer rounded-xl border border-white/20 shadow-md  backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-blue-950 sm:h-auto
"
                onClick={() => handleClick(box.id)} // click event to navigate
              >
                <img
                  className={"w-full rounded-t-md mobil330:h-48  sm:h-40 "}
                  src={box.images?.image || "/images/IMG_2016.JPG"}
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
              onClick={() => {
                if (card?.previous) {
                  setCurrentUrl(
                    card.previous.replace(import.meta.env.VITE_API_URL, ""),
                  );
                }
              }}
              disabled={!card?.previous}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow backdrop-blur-md disabled:opacity-50"
            >
              Oldingi
            </button>
            <button
              onClick={() => {
                if (card?.next) {
                  setCurrentUrl(
                    card.next.replace(import.meta.env.VITE_API_URL, ""),
                  );
                }
              }}
              disabled={!card?.next}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow backdrop-blur-md disabled:opacity-50"
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Archive;
