import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { getBridgeData } from "./api";
import { BridgeData, Location } from "./map.interfaces";
import createLucideIcon from "../../assets/icons/iconLocation";
import LocationModal from "./LocationModal";
import StatisticPanel from "./StatisticPanel.tsx";
import uzb from "../../data/uzb2.json";
import L, {
  GeoJSON as LeafletGeoJSON,
  LatLngBoundsExpression,
  LeafletMouseEvent,
} from "leaflet";

function MyMapPage() {
  const [bridge, setBridge] = useState<BridgeData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const geoJsonRef = useRef<LeafletGeoJSON>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);

  useEffect(() => {
    getBridgeData(1).then(setBridge).catch(console.error);
  }, []);

  const handleMarkerClick = (loc: Location) => {
    setSelectedLocation(loc);
    setIsModalOpen(true);
  };

  const highlightStyle: L.PathOptions = {
    weight: 2,
    color: "#ff0000",
    fillColor: "#ffcccc",
    fillOpacity: 0.7,
  };

  const defaultStyle: L.PathOptions = {
    weight: 1,
    color: "#3388ff",
    fillColor: "#cccccc",
    fillOpacity: 0.5,
  };

  const onEachCountry = (feature: GeoJSON.Feature, layer: L.Layer) => {
    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(highlightStyle);
      },
      mouseout: (e: LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle(defaultStyle);
      },
      click: (e: LeafletMouseEvent) => {
        const layer = e.target as L.Polygon; // yoki L.Polyline, agar siz chiziqlar ishlatayotgan bo‘lsangiz
        const bounds = layer.getBounds();
        setZoomTo(bounds);
      },
    });

    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name);
    }

    (layer as L.Path).setStyle(defaultStyle);
  };

  const MapZoomer: React.FC<{ bounds: LatLngBoundsExpression }> = ({
    bounds,
  }) => {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(bounds);
    }, [map, bounds]);
    return null;
  };

  return (
    <div className="relative overflow-hidden">
      <MapContainer
        center={[41.377491, 64.585258]}
        zoom={6}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zoomTo && <MapZoomer bounds={zoomTo} />}
        {bridge?.locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
            icon={createLucideIcon()}
            eventHandlers={{
              click: () => handleMarkerClick(loc),
            }}
          />
        ))}
        <GeoJSON
          data={uzb as GeoJSON.GeoJsonObject}
          onEachFeature={onEachCountry}
          ref={geoJsonRef}
        />
      </MapContainer>

      <LocationModal
        isOpen={isModalOpen}
        location={selectedLocation}
        bridge={bridge}
        onClose={() => setIsModalOpen(false)}
      />
      <StatisticPanel />
    </div>
  );
}

export default MyMapPage;
