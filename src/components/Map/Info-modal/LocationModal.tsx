import React from "react";
import { Location, BridgeData } from "../interfaceslar/map.interfaces.ts";

interface Props {
  isOpen: boolean;
  location: Location | null;
  bridge: BridgeData | null;
  onClose: () => void;
}

const LocationModal: React.FC<Props> = ({
  isOpen,
  location,
  bridge,
  onClose,
}) => {
  if (!location || !bridge) return null;

  const image = bridge.images[0]?.image;

  return (
    <div
      className={`fixed top-[82px] z-[1000] h-[95vh] w-80 bg-white shadow-lg transition-transform duration-300 dark:bg-blue-950 dark:text-amber-100 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{location.name}</h2>
        <button onClick={onClose} className="text-xl font-bold text-red-500">
          &times;
        </button>
      </div>
      <div className="space-y-2 overflow-hidden p-4">
        <p>
          <strong>ID:</strong> {location.id}
        </p>
        <p>
          <strong>Ko'prik nomi:</strong> {bridge.name}
        </p>
        <p>
          <strong>Ko'prik turi:</strong> {bridge.koprik_turi}
        </p>
        <p>
          <strong>Holat:</strong> {bridge.holat}
        </p>
        <p>
          <strong>Buyurtmachi:</strong> {bridge.buyrutmachi}
        </p>
        <p>
          <strong>Proekt:</strong> {bridge.proekt || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Texnik parametrlari:</strong>{" "}
          {bridge.texnik_parametrlari || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Umumiy summa:</strong>{" "}
          {bridge.obyektning_umumiy_summasi || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Boshlash:</strong>{" "}
          {bridge.boshlash_vaqti || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Tugash:</strong>{" "}
          {bridge.tugash_vaqti || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Asos hujjat:</strong>{" "}
          {bridge.asos_hujjat || "Ma'lumot mavjud emas"}
        </p>
        <p>
          <strong>Viloyat :</strong> {bridge.region.name}
        </p>
        <p>
          <strong>Tuman :</strong> {bridge.district.name}
        </p>
        <p>
          <strong>Ko'prik Rasmi </strong>
        </p>
        <img
          src={image}
          alt="Ko‘prik rasmi"
          className="h-48 w-full rounded object-cover"
        />
      </div>
    </div>
  );
};

export default LocationModal;
