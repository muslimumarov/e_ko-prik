import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Marker,
  Polyline,
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
import LocationModal from "./Info-modal/LocationModal.tsx";
import BackToDefaultButton from "./BackMap/BackToDefaultButton.tsx";
import DonutChartWrapper from "./progres-diagramma/DonutChartWrapper.tsx";

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

  // Map ref
  const mapRef = useRef<L.Map | null>(null);

  // Map refni olish uchun useEffect
  useEffect(() => {
    // Bu useEffect faqat bir marta ishlaydi, mapRef currentni tekshiradi
    if (!mapRef.current) return;
    // mapRef.current bilan kerakli ishlarni bajarish mumkin
  }, [mapRef.current]);

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
        return IconYellow();
      case "Tugallangan":
        return IconGreen();
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
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }, [map, bounds]);
    return null;
  };

  const selectBridge = bridges.find((bridge) =>
    bridge.locations.some((loc) => loc.id === selectedLocation?.id),
  );

  const DEFAULT_CENTER: [number, number] = [41.377491, 64.585258];
  const DEFAULT_ZOOM = 6;

  return (
    <>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        minZoom={6}
        maxZoom={20}
        maxBounds={[
          [36.0, 49.1],
          [46.599, 80.0],
        ]}
        maxBoundsViscosity={2.0}
        // here ref-ni to'g'ri ulang:
        ref={(node) => {
          if (node) {
            mapRef.current = node;
          }
        }}
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
                regionName={region_name}
                data={{
                  Jarayonda: holat_counts.Jarayonda ?? 0,
                  Rejalashtirilgan: holat_counts.Rejalashtirilgan ?? 0,
                  Tugallangan: holat_counts.Tugallangan ?? 0,
                }}
                onClick={() => {
                  setSelectedRegion(region_name);
                  mapRef.current?.setView(center, 9);
                }}
              />
            );
          })}

        {selectedRegion && (
          <BackToDefaultButton
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            onClick={() => {
              setSelectedRegion(null);
              setRegionId(null);
              setBridges([]);
              setZoomTo(null);

              // Xarita animatsion tarzda qaytsin
              if (mapRef.current) {
                mapRef.current.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
                  duration: 0.5, // sekundlarda animatsiya davomiyligi
                  easeLinearity: 0.25, // animatsiyaning tekisligi
                });
              }
            }}
          />
        )}

        <StatisticPanel />

        {zoomTo && <MapZoomer bounds={zoomTo} />}

        {bridges.flatMap((bridge) => {
          const locations = bridge.locations;
          const holatColor = {
            Jarayonda: "#f35a02",
            Tugallangan: "green",
            Rejalashtirilgan: "red",
          }[bridge.holat ?? "Rejalashtirilgan"];

          const polyline =
            locations.length >= 2 ? (
              <Polyline
                key={`polyline-${bridge.id}`}
                positions={locations.map((loc) => [
                  loc.latitude - 0.00006,
                  loc.longitude + 0.00002,
                ])} // marker "tagidan" chiqadi
                pathOptions={{
                  color: holatColor,
                  weight: 5,
                  // dashArray: "25, 15",
                  opacity: 10,
                }}
              />
            ) : null;

          return [
            ...locations.map((loc) => (
              <Marker
                key={`bridge-${bridge.id}-loc-${loc.id}`}
                position={[loc.latitude, loc.longitude]}
                icon={getIconByHolat(bridge.holat ?? "")}
                eventHandlers={{
                  click: () => handlRowclick(loc),
                }}
              />
            )),
            polyline,
          ];
        })}

        <GeoJSON
          data={uzb as GeoJSON.GeoJsonObject}
          onEachFeature={onEachCountry}
        />
      </MapContainer>

      <LocationModal
        location={selectedLocation}
        bridge={selectBridge}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default MyMapPage;
