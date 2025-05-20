import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";
import { divIcon } from "leaflet";

export const IconRed = () =>
  divIcon({
    html: renderToStaticMarkup(<MapPin size={55} color="red" />),
    className: "bg-red",
    iconSize: [34, 34],
    iconAnchor: [22, 24],
  });

export const IconYellow = () =>
  divIcon({
    html: renderToStaticMarkup(<MapPin size={55} color="#250d55" />),
    className: "",
    iconSize: [34, 34],
    iconAnchor: [22, 24],
  });

export const IconGreen = () =>
  divIcon({
    html: renderToStaticMarkup(<MapPin size={55} color="green" />),
    className: "",
    iconSize: [34, 34],
    iconAnchor: [22, 24],
  });
