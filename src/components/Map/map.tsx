import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import {
  BridgeData,
  Location,
  Statistica,
} from "./interfaceslar/map.interfaces.ts";
import createLucideIcon from "../../assets/icons/iconLocation";
import LocationModal from "./Info-modal/LocationModal.tsx";
import uzb from "../../data/uzb2.json";
import L, {
  GeoJSON as LeafletGeoJSON,
  LatLngBoundsExpression,
  LeafletMouseEvent,
} from "leaflet";

import StatisticPanel from "./umumiy-holat/StatisticPanel.tsx";
import DonutChartWrapper from "./progres-diagramma/ DonutChartWrapper.tsx";
import regionCenters from "./kordinatalar/Kordinat.ts";
import { getBridgeData, getStatisticsRegion } from "./map.api/api.ts";

function MyMapPage() {
  const [bridges, setBridges] = useState<BridgeData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const geoJsonRef = useRef<LeafletGeoJSON>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);
  const [statistics, setStatistics] = useState<Statistica[]>([]);

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

  return (
    <div className="relative overflow-hidden">
      <MapContainer
        center={[41.377491, 64.585258]}
        zoom={7}
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

        {Object.entries(regionCenters).map(([region, center]) => {
          const regionStat = statistics.find((item) => item[region]);

          return (
            <DonutChartWrapper
              key={region}
              position={center}
              data={{
                Jarayonda: regionStat?.[region]?.Jarayonda ?? 0,
                Rejalashtirilgan: regionStat?.[region]?.Rejalashtirilgan ?? 0,
                Tugallangan: regionStat?.[region]?.Tugallangan ?? 0,
              }}
            />
          );
        })}

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
