import React, { Fragment, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  BridgesResponseArxiv,
  BridgeFilters,
} from "./interfaces/arxiv.interfaces";
import { useNavigate } from "react-router-dom";
import { GetBridgeCard } from "./arxiv-api/arxiv-api.tsx";

const Archive: React.FC = () => {
  const [filters, setFilters] = useState<BridgeFilters>({
    region: "",
    holat: "",
    search: "",
    date: "",
    limit: 12,
  });

  const [card, setCard] = useState<BridgesResponseArxiv | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetBridgeCard(filters)
      .then((data) => {
        setCard(data);
      })
      .catch(() => {
        setCard({
          count: 0,
          next: null,
          previous: null,
          results: [],
        });
      });
  }, [filters]);

  const handleClick = (id: number) => {
    navigate(`/archive/${id}`);
  };

  const resetFilters = () => {
    setFilters({
      region: "",
      holat: "",
      search: "",
      date: "",
      limit: 12,
    });
  };

  return (
    <Fragment>
      <div className="container relative top-24 mx-auto ">
        <h1 className="mb-9 mt-14 text-center font-bold text-[#f35a02]  dark:text-black sm:text-5xl">
          Arxiv Ma'lumotlar
        </h1>

        {/* Filtrlar */}
        <div className="grid w-full gap-4 p-4 mobil330:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <select
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.region}
            onChange={(e) =>
              setFilters((f) => ({ ...f, region: e.target.value }))
            }
          >
            <option value="">Viloyat tanlang...</option>
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
            value={filters.holat}
            onChange={(e) =>
              setFilters((f) => ({ ...f, holat: e.target.value }))
            }
          >
            <option value="">Holat tanlang...</option>
            <option value="Tugallangan">Tugallangan</option>
            <option value="Jarayonda">Jarayonda</option>
            <option value="Rejalashtirilgan">Rejalashtirilgan</option>
          </select>

          <input
            type="date"
            className="rounded-lg border border-gray-300 bg-white/70 p-2 backdrop-blur-md"
            value={filters.date || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                date: e.target.value,
              }))
            }
          />

          <div className="relative w-full max-w-xs">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              placeholder="Qidiruv..."
              className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="mb-10 flex justify-end">
          <button
            onClick={resetFilters}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600"
          >
            Filtrlarni tozalash
          </button>
        </div>

        {/* Natijalar */}
        <div className="mb-28 flex flex-col justify-between">
          {card?.results.length === 0 && (
            <div className="p-10 text-center text-lg text-gray-400">
              <div className="text-3xl">):</div>
              <p>Hech narsa topilmadi</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 px-5 pb-7 sm:grid-cols-2 md:grid-cols-4">
            {card?.results.map((box) => (
              <div
                key={box.id}
                onClick={() => handleClick(box.id)}
                className="cursor-pointer rounded-xl border border-white/20 shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-blue-950"
              >
                <img
                  src={box.images?.image || "/images/IMG_2016.JPG"}
                  alt={box.name}
                  className="w-full rounded-t-md sm:h-40"
                />
                <h2 className="p-4 text-amber-300 dark:text-[#f35a02]">
                  {box.name.length > 70
                    ? box.name.slice(0, 70) + "..."
                    : box.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Archive;
