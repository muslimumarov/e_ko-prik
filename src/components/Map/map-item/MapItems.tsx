import L, { LatLngBoundsExpression } from "leaflet";
import metrored from "../../../../public/images/redMetro.png";
import metroyellow from "../../../../public/images/yellowMetro.png";
import metrogreen from "../../../../public/images/greenMetro.png";
import {
  IconGreen,
  IconRed,
  IconYellow,
} from "../../../assets/icons/iconLocation.tsx";
import { Location } from "../../../core/interfaces/interfaces.ts";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const IconStatus = (
  count: number,
  holat: string,
): L.Icon | L.DivIcon => {
  if (count >= 3) {
    let iconUrl = metrored;

    switch (holat) {
      case "Jarayonda":
        iconUrl = metroyellow;
        break;
      case "Tugallangan":
        iconUrl = metrogreen;
        break;
      case "Rejalashtirilgan":
        iconUrl = metrored;
        break;
    }

    return new L.Icon({
      iconUrl,
      iconSize: [40, 40],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  }

  // count 2 yoki undan kam bo‘lsa — divIcon ishlatiladi
  switch (holat) {
    case "Jarayonda":
      return IconYellow();
    case "Tugallangan":
      return IconGreen();
    case "Rejalashtirilgan":
      return IconRed();
    default:
      return IconRed();
  }
};
export const defaultStyle: L.PathOptions = {
  weight: 1,
  color: "#3388ff",
  fillColor: "#cccccc",
  fillOpacity: 0.6,
};

export const highlightStyle: L.PathOptions = {
  weight: 2,
  color: "#0b32ed",
  fillColor: "#e1a9a9",
  fillOpacity: 0.7,
};
export const calculatePolylineCenter = (
  locations: Location[],
): [number, number] | null => {
  if (!locations.length) return null;
  const latSum = locations.reduce((sum, loc) => sum + loc.latitude, 0);
  const lngSum = locations.reduce((sum, loc) => sum + loc.longitude, 0);
  return [latSum / locations.length, lngSum / locations.length];
};
export const MapZoomer: React.FC<{ bounds: LatLngBoundsExpression }> = ({
  bounds,
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(bounds, { duration: 0.8, easeLinearity: 0.25 });
  }, [map, bounds]);
  return null;
};
export const getMinZoom = () => (window.innerWidth < 768 ? 4 : 6.4);
