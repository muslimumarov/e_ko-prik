import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";
import { divIcon } from "leaflet";

const createLucideIcon = () =>
  divIcon({
    html: renderToStaticMarkup(<MapPin size={24} color="red" />),
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
export default createLucideIcon;
