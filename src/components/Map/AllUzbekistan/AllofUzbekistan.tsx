import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import React from "react";
import { useTranslation } from "react-i18next";

type BackToDefaultButtonProps = {
  center: LatLngExpression;
  zoom: number;
  onClick: () => void;
};
const AllofUzbekistan: React.FC<BackToDefaultButtonProps> = ({
  center,
  zoom,
  onClick,
}) => {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(center, zoom, { duration: 1 });
    onClick(); // Holatlarni tozalovchi funksiya
  };
  const { t } = useTranslation();

  return (
    <button
      onClick={handleClick}
      className="fixed top-[90px] z-[1000] cursor-pointer rounded border border-amber-100 px-3
            py-2  text-black backdrop-blur dark:bg-blue-950 dark:text-amber-200 mobil330:right-3 sm:right-80"
    >
      📌 {t("whole_uzbekistan")}
    </button>
  );
};

export default AllofUzbekistan;
