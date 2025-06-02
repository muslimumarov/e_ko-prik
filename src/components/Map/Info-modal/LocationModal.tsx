import React from "react";
import { useTranslation } from "react-i18next";
import { BridgeData, Location } from "../../../core/interfaces/interfaces.ts";
import CardCaption from "../../../core/components/card/CardCaption.tsx";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  location: Location | null;
  bridge: BridgeData | undefined;
  onClose: () => void;
}

const LocationModal: React.FC<Props> = ({
  isOpen,
  location,
  bridge,
  onClose,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/archive");
  };
  console.log(bridge);
  if (!location || !bridge) return null;

  return (
    <div
      className={`custom-scrollbar fixed top-[82px] z-[1000] h-[95vh] w-96 overflow-y-auto rounded border border-amber-100 shadow-lg backdrop-blur
                 transition-all duration-[1220ms] ease-in-out dark:bg-blue-950 dark:text-amber-100                  
                 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ pointerEvents: "auto", touchAction: "auto" }}
    >
      <div className="relative border-b p-4 pl-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold "
        >
          <X />
        </button>

        {/* Title */}
        <div>
          <h2 className="text-xl text-[#f35a02]">
            <strong>{t("bridgeName")}:</strong>
            <br />
            <span className="text-[18px] text-[#744817] dark:text-amber-200">
              {bridge.name}
            </span>
          </h2>
        </div>
      </div>

      <div className="mb-9  h-auto gap-2 space-y-2  overflow-hidden p-4    pl-8 text-lg text-[#f35a02]">
        <p>
          <strong>{t("region")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.region?.name || t("noData")} , {bridge.district?.name}
          </span>
        </p>
        <p>
          <strong>{t("status")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.holat || t("noData")}
          </span>{" "}
        </p>
        <p>
          <strong>{t("customer")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.buyurtmachi || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("pudratchi")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.pudratchi || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("loyihachi")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.loyihachi || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("technicalParameters")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.texnik_parametrlari || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("constructionStartDate")}:</strong> <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.boshlash_vaqti || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("tugallangan")}:</strong> <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.tugash_vaqti || t("-")}
          </span>
        </p>
        <p>
          <strong>{t("mainDocument")}:</strong>
          <br />{" "}
          <a
            className={"text-[#744817] underline  dark:text-amber-200"}
            href={bridge.asos_hujjat || t("noData")}
          >
            {t("Hujjatga Havola")}
          </a>
        </p>
        <p>
          <strong>{t("Vaqtinchalik")}:</strong>
          <br />{" "}
          <a
            className={"text-[#744817] underline  dark:text-amber-200"}
            href={bridge.vaqtinchalik_yol_sxemasi || t("noData")}
          >
            {t("Hujjatga Havola")}
          </a>
        </p>
        <p>
          <button
            onClick={handleClick}
            className=" flex items-center justify-center gap-1 font-bold text-[#f35a02] hover:underline  "
          >
            {t("Smeta")}
            <ArrowRight size={18} />
          </button>
        </p>
        <p>
          <strong className={"text-[#f35a02]"}>
            {" "}
            {t("photos") || t("noData")}
          </strong>
        </p>
        {bridge.images.length === 0 ? (
          <p className={"text-sm text-[#744817]"}>{t("noBridgeImages")}</p>
        ) : (
          bridge.images.map((image) => (
            <div key={image.id}>
              <CardCaption src={image.image} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationModal;
