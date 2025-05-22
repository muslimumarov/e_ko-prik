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
      className="absolute right-[10px] top-[10px] z-[1000] cursor-pointer rounded border
            border-gray-300  bg-white px-3 py-2 text-black dark:bg-[#250d55] dark:text-amber-200"
    >
      📌 Butun O'zbekiston
    </button>
  );
};

export default BackToDefaultButton;
