// import React, { useEffect, useRef,  } from "react";
// import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from "react-leaflet";
// import L, { LeafletMouseEvent, LatLngBoundsExpression, Path } from "leaflet";
// import createLucideIcon from "../../assets/icons/iconLocation";
// import { BridgeData, Location, Statistica } from "./map.interfaces";
// import uzb from "../../data/uzb2.json";
//
// type Props = {
//     stat: Statistica | null;
//     bridges: BridgeData[];
//     onLocationClick: (loc: Location) => void;
//     zoomTo: LatLngBoundsExpression | null;
//     setZoomTo: (bounds: LatLngBoundsExpression | null) => void;
// };
//
// const defaultStyle: L.PathOptions = {
//     weight: 1,
//     color: "#3388ff",
//     fillColor: "#cccccc",
//     fillOpacity: 0.5,
// };
//
// const highlightStyle: L.PathOptions = {
//     weight: 2,
//     color: "#ff0000",
//     fillColor: "#ffcccc",
//     fillOpacity: 0.7,
// };
//
// const MapZoomer: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
//     const map = useMap();
//     useEffect(() => {
//         map.fitBounds(bounds);
//     }, [map, bounds]);
//     return null;
// };
//
// const MapComponent: React.FC<Props> = ({  bridges, onLocationClick, zoomTo, setZoomTo }) => {
//     const geoJsonRef = useRef<L.GeoJSON>(null);
//
//     const onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
//         layer.on({
//             mouseover: (e: LeafletMouseEvent) => {
//                 const target = e.target as Path;
//                 target.setStyle(highlightStyle);
//             },
//             mouseout: (e: LeafletMouseEvent) => {
//                 const target = e.target as Path;
//                 target.setStyle(defaultStyle);
//             },
//             click: (e: LeafletMouseEvent) => {
//                 const layer = e.target as L.Polygon;
//                 const bounds = layer.getBounds();
//                 setZoomTo(bounds);
//             },
//         });
//
//         if (feature.properties && feature.properties.name) {
//             layer.bindTooltip(feature.properties.name);
//         }
//
//         (layer as Path).setStyle(defaultStyle);
//     };
//
//     return (
//         <MapContainer center={[41.377491, 64.585258]} zoom={6} style={{ height: "100vh", width: "100%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
//
//             {zoomTo && <MapZoomer bounds={zoomTo} />}
//
//             {bridges.flatMap((bridge) =>
//                 bridge.locations.map((loc) => (
//                     <Marker
//                         key={`bridge-${bridge.id}-loc-${loc.id}`}
//                         position={[loc.latitude, loc.longitude]}
//                         icon={createLucideIcon()}
//                         eventHandlers={{ click: () => onLocationClick(loc) }}
//                     />
//                 ))
//             )}
//
//             <GeoJSON data={uzb as GeoJSON.GeoJsonObject} onEachFeature={onEachFeature} ref={geoJsonRef} />
//         </MapContainer>
//     );
// };
//
// export default MapComponent;
