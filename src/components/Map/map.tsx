import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { getBridgeData, getStatisticsRegion } from "./api";
import { BridgeData, Location, Statistica } from "./map.interfaces";
import createLucideIcon from "../../assets/icons/iconLocation";
import LocationModal from "./LocationModal";
import uzb from "../../data/uzb2.json";
import L, {
  GeoJSON as LeafletGeoJSON,
  LatLngBoundsExpression,
  LeafletMouseEvent,
} from "leaflet";

import StatisticPanel from "./StatisticPanel.tsx";
import DonutChartWrapper from "./ DonutChartWrapper.tsx";

function MyMapPage() {
  const [bridges, setBridges] = useState<BridgeData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const geoJsonRef = useRef<LeafletGeoJSON>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);
  const [statistics, setStatistics] = useState<Statistica>({});
  useEffect(() => {
    getBridgeData(1).then(setBridges).catch(console.error);
    getStatisticsRegion().then(setStatistics).catch(console.error);
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
        const layer = e.target as L.Polygon;
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

  // Tanlangan location'ga tegishli bridge ni aniqlash
  const selectedBridge = bridges.find((bridge) =>
    bridge.locations.some((loc) => loc.id === selectedLocation?.id),
  );
  const regionCenters: Record<string, [number, number]> = {
    "Toshkent shahar": [41.311081, 69.240562],
    "Toshkent viloyati": [41.0, 69.0],
    Samarqand: [39.6542, 66.9597],
    "Farg'ona": [40.3894, 71.7874],
    Andijon: [40.7836, 72.3442],
    Namangan: [40.9983, 71.6726],
    Navoiy: [40.0844, 65.3792],
    Sirdaryo: [40.8357, 68.6607],
    Jizzax: [40.125, 67.25],
    Qashqadaryo: [38.8333, 66.25],
    Surxondaryo: [37.94, 67.57],
    Buroxo: [40.5, 64.5], // Maxsus viloyat bo‘lsa
    "Qoraqalpog'iston Respublikasi": [43.7689, 59.0015],
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

        {bridges.flatMap((bridge) =>
          bridge.locations.map((loc) => (
            <Marker
              key={`bridge-${bridge.id}-loc-${loc.id}`}
              position={[loc.latitude, loc.longitude]}
              icon={createLucideIcon()}
              eventHandlers={{
                click: () => handleMarkerClick(loc),
              }}
            />
          )),
        )}

        {Object.entries(regionCenters).map(([region, center]) => (
          <DonutChartWrapper
            key={region}
            position={center}
            data={{
              Jarayonda: statistics?.[region]?.Jarayonda ?? 0,
              Rejalashtirilgan: statistics?.[region]?.Rejalashtirilgan ?? 0,
              Tugallangan: statistics?.[region]?.Tugallangan ?? 0,
            }}
          />
        ))}

        <GeoJSON
          data={uzb as GeoJSON.GeoJsonObject}
          onEachFeature={onEachCountry}
          ref={geoJsonRef}
        />
      </MapContainer>
      <StatisticPanel />
      <LocationModal
        isOpen={isModalOpen}
        location={selectedLocation}
        bridge={selectedBridge || null}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default MyMapPage;
