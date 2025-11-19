import React from "react";
import { useTranslation } from "react-i18next";
import { BridgeData, Location } from "../../../core/interfaces/interfaces.ts";
import CardCaption from "../../../core/components/card/CardCaption.tsx";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/modalStore.ts";
import useAuthStore from "../../../store/useAuthStore.ts";

interface Props {
  location: Location | null;
  bridge?: BridgeData;
}

const InfoModal: React.FC<Props> = ({ location, bridge }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();

  if (!isOpen || !location || !bridge) return null;

  const handleClick = () => {
    if (!isAuthenticated) {
      // Agar login bo'lmagan bo'lsa, bridge id saqlaymiz va login sahifasiga yo'naltiramiz
      localStorage.setItem("redirectBridgeId", bridge.id?.toString() || "");
      navigate("/login");
      return;
    }

    // Login bo'lsa to'g'ridan-to'g'ri arxivga o'tamiz
    navigate(`/archive/${bridge.id}`);
    closeModal();
  };

  const dataItem = (label: string, value?: string | null) => (
    <p>
      <strong>{label}:</strong>
      <br />
      <span className="text-[#744817] dark:text-amber-200">
        {value || t("noData")}
      </span>
    </p>
  );

  return (
    <div
      className={`custom-scrollbar fixed top-[75px] z-[1000] h-[95vh] w-[295px] overflow-y-auto rounded-tr-lg backdrop-blur transition-all duration-700 ease-in-out dark:bg-blue-950 dark:text-amber-100 sm:w-96 sm:rounded-none ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
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
          `${bridge.region?.name || ""}, ${bridge.district?.name || ""}`,
        )}
        {dataItem(
          t("status"),
          bridge.holat ? t(`statuss.${bridge.holat}`) : t("noData"),
        )}
        {dataItem(t("customer"), bridge.buyrutmachi)}
        {dataItem(t("pudratchi"), bridge.pudratchi)}
        {dataItem(t("loyihachi"), bridge.loyihachi)}
        {dataItem(t("technicalParameters"), bridge.texnik_parametrlari)}
        {dataItem(
          t("obyektdagi_xodimlar_soni"),
          bridge.obyektdagi_xodimlar_soni,
        )}
        {dataItem(
          t("obyektdagi_texnikalar_soni"),
          bridge.obyektdagi_texnikalar_soni,
        )}
        <a
          className={"text-blue-600 underline dark:text-amber-400 "}
          href="https://gps.kuprikqurilish.uz/replay"
        >
          GPS tizimiga havola <ArrowRight className={"inline"} size={18} />
        </a>
        {dataItem(t("constructionStartDate"), bridge.boshlash_vaqti)}
        {dataItem(t("tugallangan"), bridge.tugash_vaqti)}

        <p>
          <button
            onClick={handleClick}
            className="flex items-center gap-1 text-left font-bold text-[#f35a02] hover:underline"
          >
            {t("mainDocument")}
            <ArrowRight size={18} />
          </button>
        </p>

        <p>
          <button
            onClick={handleClick}
            className="flex items-center gap-1 text-left font-bold text-[#f35a02] hover:underline"
          >
            {t("Vaqtinchalik")}
            <ArrowRight size={18} />
          </button>
        </p>

        <p>
          <button
            onClick={handleClick}
            className="flex items-center gap-1 text-left font-bold text-[#f35a02] hover:underline"
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

export default InfoModal;
