import React, { Fragment } from "react";
import { BridgeData } from "../../../core/interfaces/interfaces.ts";
import TitleBanner from "../../../core/components/banner/TitleBanner.tsx";
import { ArrowLeft, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {
  data: BridgeData;
}

const ArchiveDetail: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  const tabItems = {
    path: "/archive",
    label: t("Arxiv Malumotlari"),
    children: [
      { path: "archiveDetails", label: t("archiveDetails"), icon: Globe },
    ],
  };
  const navigate = useNavigate();
  return (
    <Fragment>
      <TitleBanner
        title={tabItems.label}
        basePath={tabItems.path}
        // activeChild={tabItems.label}
      />
      <div className="mx-auto max-w-4xl space-y-4 rounded border p-4 text-sm shadow-sm">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <a
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex cursor-pointer items-center gap-2 font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <ArrowLeft size={16} />
          {t("Orqaga")}
        </a>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Viloyat:</strong> {data.region.name}
          </div>
          <div>
            <strong>Tuman:</strong> {data.district.name}
          </div>
          <div>
            <strong>Holat:</strong> {data.holat || "–"}
          </div>
          <div>
            <strong>Buyurtmachi:</strong> {data.buyrutmachi || "–"}
          </div>
          <div>
            <strong>Pudratchi:</strong> {data.pudratchi || "–"}
          </div>
          <div>
            <strong>Loyihachi:</strong> {data.loyihachi || "–"}
          </div>
          <div>
            <strong>Boshlanish vaqti:</strong> {data.boshlash_vaqti || "–"}
          </div>
          <div>
            <strong>Tugash vaqti:</strong> {data.tugash_vaqti || "–"}
          </div>
          <div>
            <strong>Asos hujjat:</strong> {data.asos_hujjat || "–"}
          </div>
          <div>
            <strong>Texnik parametrlari:</strong>{" "}
            {data.texnik_parametrlari || "–"}
          </div>
        </div>

        {data.locations.length > 0 && (
          <div>
            <h3 className="mt-4 font-semibold">Manzillar</h3>
            <ul className="list-inside list-disc">
              {data.locations.map((loc) => (
                <li key={loc.id}>
                  {loc.name || "Noma’lum"} – lat: {loc.latitude}, long:{" "}
                  {loc.longitude}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.images.length > 0 && (
          <div>
            <h3 className="mt-4 font-semibold">Rasmlar</h3>
            <div className="flex flex-wrap gap-2">
              {data.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={`image-${img.id}`}
                  className="h-28 w-40 rounded border object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default ArchiveDetail;
