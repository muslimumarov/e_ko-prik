import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import React from "react";

type BackToDefaultButtonProps = {
  center: LatLngExpression;
  zoom: number;
  onClick: () => void;
};

const BackToDefaultButton: React.FC<BackToDefaultButtonProps> = ({
  center,
  zoom,
  onClick,
}) => {
  const map = useMap();

  const handleClick = () => {
    map.flyTo(center, zoom, { duration: 1 });
    onClick(); // Holatlarni tozalovchi funksiya
  };
  return (
    <button
      onClick={handleClick}
      className="fixed top-[90px] z-[1000] cursor-pointer rounded border border-amber-100 px-3
            py-2  text-black backdrop-blur dark:bg-[#250d55] dark:text-amber-200 mobil330:right-3 sm:right-80"
    >
      📌 Butun O'zbekiston
    </button>
  );
};

export default BackToDefaultButton;
