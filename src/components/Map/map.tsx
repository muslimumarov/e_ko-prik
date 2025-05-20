import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Marker,
} from "react-leaflet";
import L, { LatLngBoundsExpression, LeafletMouseEvent } from "leaflet";
import {
  BridgeData,
  Location,
  StatisticaResponse,
} from "./interfaceslar/map.interfaces.ts";
import regionCenters from "./kordinatalar/Kordinat.ts";
import uzb from "../../data/uzb2.json";
import { getBridgeData, getStatisticsRegion } from "./map.api/api.ts";
import StatisticPanel from "./umumiy-holat/StatisticPanel.tsx";
import {
  IconGreen,
  IconRed,
  IconYellow,
} from "../../assets/icons/iconLocation.tsx";
import DonutChartWrapper from "./progres-diagramma/ DonutChartWrapper.tsx";
import LocationModal from "./Info-modal/LocationModal.tsx";

function MyMapPage() {
  const [statistics, setStatistics] = useState<StatisticaResponse>([]);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);
  const [bridges, setBridges] = useState<BridgeData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlRowclick = (loc: Location) => {
    setSelectedLocation(loc);
    setIsOpen(true);
  };
  useEffect(() => {
    getStatisticsRegion()
      .then((data) => {
        setStatistics(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (regionId !== null) {
      console.log("Region ID:", regionId);
      // boshqa foydalanishlar
    }
  }, [regionId]);
  useEffect(() => {
    if (selectedRegion && statistics.length > 0) {
      const found = statistics.find(
        (item) => item.region_name === selectedRegion,
      );

      if (found) {
        setRegionId(found.region_id);
        getBridgeData(found.region_id).then(setBridges).catch(console.error);
      }
    }
  }, [selectedRegion, statistics]);
  const defaultStyle: L.PathOptions = {
    weight: 1,
    color: "#3388ff",
    fillColor: "#cccccc",
    fillOpacity: 0.5,
  };
  const highlightStyle: L.PathOptions = {
    weight: 2,
    color: "#ff0000",
    fillColor: "#ffcccc",
    fillOpacity: 0.7,
  };
  const getIconByHolat = (holat: string) => {
    switch (holat) {
      case "Jarayonda":
        return IconGreen();
      case "Tugallangan":
        return IconYellow();
      case "Rejalashtirilgan":
        return IconRed();
      default:
        return IconRed();
    }
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
        const polygon = e.target as L.Polygon;
        const bounds = polygon.getBounds();
        setZoomTo(bounds);

        const regionName = feature.properties?.NAME_1;
        console.log(regionName);
        if (!regionName) return;
        setSelectedRegion(regionName);
      },
    });

    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name);
    }

    (layer as L.Path).setStyle(defaultStyle);
  };
  const MapZoomer: React.FC<{ bounds: LatLngBoundsExpression }> = ({
    bounds,
  }) => {
    const map = useMap();
    useEffect(() => {
      map.flyToBounds(bounds, {
        duration: 1,
        easeLinearity: 0.25,
      });
    }, [map, bounds]);
    return null;
  };

  const selectBridge = bridges.find((bridge) =>
    bridge.locations.some((loc) => loc.id === selectedLocation?.id),
  );

  return (
    <MapContainer
      center={[41.377491, 64.585258]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
      minZoom={6}
      maxZoom={9}
      maxBounds={[
        [36.0, 55.0],
        [46.0, 73.0],
      ]}
      maxBoundsViscosity={2.0}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!selectedRegion &&
        statistics.map(({ region_name, holat_counts }) => {
          const center = regionCenters[region_name];
          if (!center) return null;
          return (
            <DonutChartWrapper
              key={region_name}
              position={center}
              data={{
                Jarayonda: holat_counts.Jarayonda ?? 0,
                Rejalashtirilgan: holat_counts.Rejalashtirilgan ?? 0,
                Tugallangan: holat_counts.Tugallangan ?? 0,
              }}
            />
          );
        })}

      <StatisticPanel />

      {/* Zoom */}
      {zoomTo && <MapZoomer bounds={zoomTo} />}

      {/* Ko‘priklar */}
      {bridges.flatMap((bridge) =>
        bridge.locations.map((loc) => (
          <Marker
            key={`bridge-${bridge.id}-loc-${loc.id}`}
            position={[loc.latitude, loc.longitude]}
            icon={getIconByHolat(bridge.holat ?? "")}
            eventHandlers={{
              click: () => handlRowclick(loc),
            }}
          />
        )),
      )}
      <LocationModal
        location={selectedLocation}
        bridge={selectBridge}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      {/* Regionlar (GeoJSON) */}
      <GeoJSON
        data={uzb as GeoJSON.GeoJsonObject}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
}

export default MyMapPage;
