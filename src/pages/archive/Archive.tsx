import React, { Fragment } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CustomDate } from "../../core/components/CustomDateInput/CustomDate";
import { useArchiveData } from "./arxiv-items/useArchiveData.tsx";
import { useTranslation } from "react-i18next";

const Archive: React.FC = () => {
  const { filters, setFilters, card, resetFilters, handlePageChange } =
    useArchiveData();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = (id: number) => {
    sessionStorage.setItem("archive_offset", String(filters.offset));
    sessionStorage.setItem("archive_filters", JSON.stringify(filters));
    navigate(`/archive/${id}`);
  };

  return (
    <Fragment>
      <div className="container relative top-24 mx-auto px-4">
        {/* Header */}
        <div className="my-14 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="animate-fade-in-up text-center text-4xl font-bold text-[#f35a02] dark:text-white sm:text-5xl">
            {t("Arxiv Ma'lumotlar")}
          </h1>
          <div className="relative w-full max-w-xs animate-fade-in">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="text"
              placeholder={t("Qidiruv...")}
              className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value, offset: 0 }))
              }
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* Region */}
          <select
            className="rounded-lg border border-gray-300 bg-white/60 p-2 text-sm shadow-sm backdrop-blur-md transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filters.region}
            onChange={(e) =>
              setFilters((f) => ({ ...f, region: e.target.value, offset: 0 }))
            }
          >
            <option value="">{t("Viloyat tanlang...")}</option>
            <option value="1">{t("Buxoro")}</option>
            <option value="2">{t("Toshkent viloyati")}</option>
            <option value="3">{t("Toshkent shahar")}</option>
            <option value="4">{t("Samarqand")}</option>
            <option value="5">{t("Navoiy")}</option>
            <option value="6">{t("Farg'ona")}</option>
            <option value="7">{t("Andijon")}</option>
            <option value="8">{t("Namangan")}</option>
            <option value="9">{t("Sirdaryo")}</option>
            <option value="10">{t("Jizzax")}</option>
            <option value="11">{t("Qoraqalpog'iston Respublikasi")}</option>
            <option value="12">{t("Surxondaryo")}</option>
            <option value="13">{t("Qashqadaryo")}</option>
            <option value="14">{t("Xorazm")}</option>
          </select>

          {/* Holat */}
          <select
            className="rounded-lg border border-gray-300 bg-white/60 p-2 text-sm shadow-sm backdrop-blur-md transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filters.holat}
            onChange={(e) =>
              setFilters((f) => ({ ...f, holat: e.target.value, offset: 0 }))
            }
          >
            <option value="">{t("Holat tanlang...")}</option>
            <option value="Tugallangan">{t("Tugallangan")}</option>
            <option value="Jarayonda">{t("Jarayonda")}</option>
            <option value="Rejalashtirilgan">{t("Rejalashtirilgan")}</option>
          </select>

          {/* Sana */}
          <CustomDate
            placeholder={t("Sanani tanlang")}
            value={filters.date || ""}
            onSelectedDateChanged={(_, formatted) =>
              setFilters((f) => {
                if (f.date === formatted) return f;
                return { ...f, date: formatted, offset: 0 };
              })
            }
          />

          {/* Filtr tozalash */}
          <button
            onClick={resetFilters}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow-md transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {t("Filtrlarni tozalash")}
          </button>
        </div>

        {/* Results */}
        <div className="mb-28 flex flex-col justify-between">
          {Array.isArray(card?.results) && card.results.length === 0 && (
            <div className="p-10 text-center text-lg text-gray-400">
              <div className="text-3xl">):</div>
              <p>{t("Hech narsa topilmadi")}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 px-5 pb-7 sm:grid-cols-2 md:grid-cols-4">
            {Array.isArray(card?.results) &&
              card.results.map((box) => (
                <div
                  key={box.id}
                  onClick={() => handleClick(box.id)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-md backdrop-blur-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-blue-950"
                >
                  <img
                    src={box.images?.image || "/images/IMG_2016.jpg"}
                    alt={box.name}
                    className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <h2 className="p-4 text-black transition-colors duration-300 group-hover:text-orange-500 dark:text-[#f35a02]">
                    {box.name.length > 70
                      ? box.name.slice(0, 70) + "..."
                      : box.name}
                  </h2>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {card?.count && card.count > filters.limit && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() => handlePageChange(false)}
                disabled={(filters.offset || 0) === 0}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm shadow-md backdrop-blur-md transition hover:bg-gray-100 disabled:opacity-50"
              >
                ⬅ {t("Oldingi")}
              </button>
              <span className="text-sm text-gray-500">
                {(filters.offset || 0) / (filters.limit || 12) + 1} /{" "}
                {Math.ceil(card.count / (filters.limit || 12))}
              </span>
              <button
                onClick={() => handlePageChange(true)}
                disabled={
                  (filters.offset || 0) + (filters.limit || 12) >= card.count
                }
                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm shadow-md backdrop-blur-md transition hover:bg-gray-100 disabled:opacity-50"
              >
                {t("Keyingi")} ➡
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Archive;
