import { useEffect, useMemo, useRef, useState, Fragment } from "react";
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
} from "../../core/interfaces/interfaces";
import regionCenters from "./kordinatalar/Kordinat";
import uzb from "../../core/data/uzb2.json";
import StatisticPanel from "./umumiy-holat/StatisticPanel";
import {
  IconGreen,
  IconRed,
  IconYellow,
} from "../../assets/icons/iconLocation";
import LocationModal from "./Info-modal/LocationModal";
import DonutChartWrapper from "./progres-diagramma/DonutChartWrapper";
import { getBridgeData, getStatisticsRegion } from "../../core/hooks/api";
import BackToDefaultButton from "./BackMap/BackToDefaultButton";
import { useModalStore } from "../../store/modalStore.ts";

function MyMapPage() {
  const [statistics, setStatistics] = useState<StatisticaResponse>([]);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);
  const [bridges, setBridges] = useState<BridgeData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const { openModal } = useModalStore();
  const mapRef = useRef<L.Map | null>(null);

  const DEFAULT_CENTER = useMemo<[number, number]>(
    () => [41.377491, 64.585258],
    [],
  );
  const DEFAULT_ZOOM = 6;

  // Birinchi renderda localStorage dan o'qish va statistikani olish
  useEffect(() => {
    getStatisticsRegion().then(setStatistics).catch(console.error);

    const savedRegion = localStorage.getItem("selectedRegion");
    if (savedRegion) setSelectedRegion(savedRegion);

    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) setSelectedLocation(JSON.parse(savedLocation));
  }, []);

  // selectedRegion yoki statistics o'zgarganda bridges va regionId ni o'rnatish
  useEffect(() => {
    if (selectedRegion && statistics.length > 0) {
      const found = statistics.find(
        (item) => item.region_name === selectedRegion,
      );
      if (found && found.region_id !== regionId) {
        setRegionId(found.region_id);
        getBridgeData(found.region_id).then(setBridges).catch(console.error);
      }
    }
  }, [selectedRegion, statistics, regionId]);

  // Tanlangan region va location ni localStorage ga yozish
  useEffect(() => {
    if (selectedRegion) {
      localStorage.setItem("selectedRegion", selectedRegion);
    } else {
      localStorage.removeItem("selectedRegion");
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedLocation) {
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify(selectedLocation),
      );
    } else {
      localStorage.removeItem("selectedLocation");
    }
  }, [selectedLocation]);

  const defaultStyle: L.PathOptions = useMemo(
    () => ({
      weight: 1,
      color: "#3388ff",
      fillColor: "#cccccc",
      fillOpacity: 0.6,
    }),
    [],
  );

  const highlightStyle: L.PathOptions = useMemo(
    () => ({
      weight: 2,
      color: "#ff0000",
      fillColor: "#e1a9a9",
      fillOpacity: 0.7,
    }),
    [],
  );

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
        (e.target as L.Path).setStyle(highlightStyle);
      },
      mouseout: (e: LeafletMouseEvent) => {
        (e.target as L.Path).setStyle(defaultStyle);
      },
      click: (e: LeafletMouseEvent) => {
        const regionName = feature.properties?.NAME_1;
        if (!regionName) return;
        setSelectedRegion(regionName);
        const polygon = e.target as L.Polygon;
        setZoomTo(polygon.getBounds());
      },
    });
    (layer as L.Path).setStyle(defaultStyle);
  };

  const MapZoomer: React.FC<{ bounds: LatLngBoundsExpression }> = ({
    bounds,
  }) => {
    const map = useMap();
    useEffect(() => {
      map.flyToBounds(bounds, { duration: 0.8, easeLinearity: 0.25 });
    }, [map, bounds]);
    return null;
  };

  const selectBridge = useMemo(() => {
    return bridges.find((bridge) =>
      bridge.locations.some((loc) => loc.id === selectedLocation?.id),
    );
  }, [bridges, selectedLocation]);

  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      const center = regionCenters[selectedRegion];
      if (center) {
        mapRef.current.flyTo(center, 9, { duration: 0.5 });
      }
    } else if (!selectedRegion && mapRef.current) {
      mapRef.current.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, { duration: 0.5 });
    }
  }, [selectedRegion]);

  const calculatePolylineCenter = (
    locations: Location[],
  ): [number, number] | null => {
    if (!locations.length) return null;
    const latSum = locations.reduce((sum, loc) => sum + loc.latitude, 0);
    const lngSum = locations.reduce((sum, loc) => sum + loc.longitude, 0);
    return [latSum / locations.length, lngSum / locations.length];
  };

  return (
    <Fragment>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        minZoom={6.4}
        maxZoom={20}
        maxBounds={[
          [36.0, 49.1],
          [46.599, 80.0],
        ]}
        maxBoundsViscosity={2.0}
        ref={(node) => (mapRef.current = node)}
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
              mapRef.current?.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
                duration: 0.5,
                easeLinearity: 0.25,
              });
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

          if (!locations.length) return [];

          if (locations.length === 1) {
            const loc = locations[0];
            return [
              <Marker
                key={`marker-${bridge.id}`}
                position={[loc.latitude, loc.longitude]}
                icon={getIconByHolat(bridge.holat ?? "")}
                eventHandlers={{
                  click: () => {
                    setSelectedLocation(loc);
                    openModal();
                  },
                }}
              />,
            ];
          }

          const polylineCenter = calculatePolylineCenter(locations);

          return [
            <Polyline
              key={`polyline-${bridge.id}`}
              positions={locations.map((loc) => [
                loc.latitude - 0.00006,
                loc.longitude + 0.00002,
              ])}
              pathOptions={{ color: holatColor, weight: 5, opacity: 1 }}
            />,
            polylineCenter && (
              <Marker
                key={`center-${bridge.id}`}
                position={polylineCenter}
                icon={getIconByHolat(bridge.holat ?? "")}
                eventHandlers={{
                  click: () => {
                    const centerLoc = {
                      ...locations[0],
                      latitude: polylineCenter[0],
                      longitude: polylineCenter[1],
                    };
                    setSelectedLocation(centerLoc);
                    openModal();
                  },
                }}
              />
            ),
          ];
        })}

        <GeoJSON
          data={uzb as GeoJSON.GeoJsonObject}
          onEachFeature={onEachCountry}
        />
      </MapContainer>

      <LocationModal location={selectedLocation} bridge={selectBridge} />
    </Fragment>
  );
}

export default MyMapPage;
