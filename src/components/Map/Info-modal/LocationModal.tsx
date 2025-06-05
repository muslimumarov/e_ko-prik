// LocationModal.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { BridgeData, Location } from "../../../core/interfaces/interfaces.ts";
import CardCaption from "../../../core/components/card/CardCaption.tsx";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/modalStore.ts";

interface Props {
  location: Location | null;
  bridge?: BridgeData;
}

const LocationModal: React.FC<Props> = ({ location, bridge }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModalStore();
  if (!isOpen) return null;
  if (!location || !bridge) return null;

  const handleClick = () => navigate("/archive");

  const dataItem = (label: string, value?: string | null) => (
    <p>
      <strong>{label}:</strong>
      <br />
      <span className="text-[#744817] dark:text-amber-200">
        {value || t("noData")}
      </span>
    </p>
  );

  const linkItem = (label: string, url?: string | null) => (
    <p>
      <strong>{label}:</strong>
      <br />
      {url ? (
        <a className="text-[#744817] underline dark:text-amber-200" href={url}>
          {t("Hujjatga Havola")}
        </a>
      ) : (
        <span className="text-[#744817] dark:text-amber-200">
          {t("noData")}
        </span>
      )}
    </p>
  );

  return (
    <div
      className={`custom-scrollbar fixed top-[82px] z-[1000] h-[95vh] w-96 overflow-y-auto rounded border border-amber-100 shadow-lg backdrop-blur
        transition-all duration-[1220ms] ease-in-out dark:bg-blue-950 dark:text-amber-100
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ pointerEvents: "auto", touchAction: "auto" }}
    >
      <div className="relative border-b p-4 pl-8">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-2xl font-bold"
        >
          <X />
        </button>
        <h2 className="text-xl text-[#f35a02]">
          <strong>{t("bridgeName")}:</strong>
          <br />
          <span className="text-[18px] text-[#744817] dark:text-amber-200">
            {bridge.name}
          </span>
        </h2>
      </div>

      <div className="mb-9 space-y-2 p-4 pl-8 text-lg text-[#f35a02]">
        {dataItem(
          t("region"),
          `${bridge.region?.name}, ${bridge.district?.name}`,
        )}
        {dataItem(t("status"), bridge.holat)}
        {dataItem(t("customer"), bridge.buyrutmachi)}
        {dataItem(t("pudratchi"), bridge.pudratchi)}
        {dataItem(t("loyihachi"), bridge.loyihachi)}
        {dataItem(t("technicalParameters"), bridge.texnik_parametrlari)}
        {dataItem(t("constructionStartDate"), bridge.boshlash_vaqti)}
        {dataItem(t("tugallangan"), bridge.tugash_vaqti)}
        {linkItem(t("mainDocument"), bridge.asos_hujjat)}
        {linkItem(t("Vaqtinchalik"), bridge.vaqtinchalik_yol_sxemasi)}

        <p>
          <button
            onClick={handleClick}
            className="flex items-center gap-1 font-bold text-[#f35a02] hover:underline"
          >
            {t("Smeta")}
            <ArrowRight size={18} />
          </button>
        </p>

        <p>
          <strong className="text-[#f35a02]">{t("photos")}</strong>
        </p>

        {bridge.images.length === 0 ? (
          <p className="text-sm text-[#744817]">{t("noBridgeImages")}</p>
        ) : (
          bridge.images.map((img) => (
            <div key={img.id}>
              <CardCaption src={img.image} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationModal;
