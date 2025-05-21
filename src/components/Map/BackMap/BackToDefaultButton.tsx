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
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "8px 12px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      📌 Butun O'zbekiston
    </button>
  );
};

export default BackToDefaultButton;
