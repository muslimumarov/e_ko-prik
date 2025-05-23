import React from "react";
import { useTranslation } from "react-i18next";
import { BridgeData, Location } from "../interfaceslar/map.interfaces.ts";
import CardCaption from "../../../core/components/card/CardCaption.tsx";
import { X } from "lucide-react";

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

  if (!location || !bridge) return null;

  return (
    <div
      className={`custom-scrollbar fixed top-[82px] z-[1000] h-[95vh] w-96 overflow-y-auto bg-white shadow-lg
                 transition-all duration-[1220ms] ease-in-out dark:bg-blue-950 dark:text-amber-100                  
                 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ pointerEvents: "auto", touchAction: "auto" }}
    >
      <div className="relative border-b p-4 pl-8">
        {/* Close (X) Button */}
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
        <p className={"dark:text-amber-200"}>
          <strong>{t("bridgeType")}:</strong>
          <br />{" "}
          <span className={"dark:text-amber-200text-[#744817]"}>
            {bridge.koprik_turi || t("noData")}
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
            {bridge.buyrutmachi || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("project")}:</strong>
          <br />{" "}
          <a
            target={"_blank"}
            className={"text-[#744817]  underline dark:text-amber-200"}
            href={bridge.proekt || t("noData")}
          >
            {t("Loyhaga Havola")}
          </a>
        </p>
        <p>
          <strong>{t("technicalParameters")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.texnik_parametrlari || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("totalSum")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.obyektning_umumiy_summasi || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("start")}:</strong> <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.boshlash_vaqti || t("noData")}
          </span>
        </p>
        <p>
          <strong>{t("mainDocument")}:</strong>
          <br />{" "}
          <a
            className={"text-[#744817] underline  dark:text-amber-200"}
            target={"_blank"}
            href={bridge.asos_hujjat || t("noData")}
          >
            {t("Hujjatga Havola")}
          </a>
        </p>
        <p>
          <strong>{t("region")}:</strong>
          <br />{" "}
          <span className={"text-[#744817] dark:text-amber-200"}>
            {bridge.region.name || t("noData")}
          </span>
        </p>
        <p>
          <strong className={"text-[#f35a02]"}>
            {" "}
            {t("bridgeImage") || t("noData")}
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
