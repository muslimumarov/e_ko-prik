import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import L, { LatLngBoundsExpression, LeafletMouseEvent } from "leaflet";
import {
  BridgeData,
  HolatCounts,
  Location,
  StatisticaResponse,
} from "../../core/interfaces/interfaces";
import regionCenters from "./coordinates/coordinates.ts";
import uzb from "../../core/data/uzb2.json";
import StatisticPanel from "./statistic-panel/StatisticPanel";
import InfoModal from "./Info-modal/info-modal.tsx";
import DonutChartWrapper from "./progres-diagramma/DonutChartWrapper";
import { getBridgeData, getStatisticsRegion } from "../../core/hooks/api";
import AllofUzbekistan from "./AllUzbekistan/AllofUzbekistan.tsx";
import FilterDropdown from "./map-filter/FilterDropdown.tsx";
import { useModalStore } from "../../store/modalStore.ts";
import {
  calculatePolylineCenter,
  defaultStyle,
  getMinZoom,
  highlightStyle,
  IconStatus,
  MapZoomer,
} from "./map-item/MapItems.tsx";

function MyMapPage() {
  const [statistics, setStatistics] = useState<StatisticaResponse>([]);
  const [regionId, setRegionId] = useState<number | null>(null);
  const [zoomTo, setZoomTo] = useState<LatLngBoundsExpression | null>(null);
  const [bridges, setBridges] = useState<BridgeData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [holatFilter, setHolatFilter] = useState<string>("all");
  const mapRef = useRef<L.Map | null>(null);
  const { openModal } = useModalStore();
  const DEFAULT_CENTER = useMemo<[number, number]>(
    () => [41.377491, 64.585258],
    [],
  );
  const DEFAULT_ZOOM = 6;

  // --- API fetchlar ---
  useEffect(() => {
    getStatisticsRegion().then(setStatistics).catch(console.error);
    const savedRegion = localStorage.getItem("selectedRegion");
    if (savedRegion) setSelectedRegion(savedRegion);
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) setSelectedLocation(JSON.parse(savedLocation));
  }, []);

  useEffect(() => {
    if (!selectedRegion || statistics.length === 0) return;

    const fetchBridges = async () => {
      const found = statistics.find(
        (item) => item.region_name === selectedRegion,
      );
      if (!found) return;

      if (found.region_id !== regionId || holatFilter) {
        setRegionId(found.region_id);
        try {
          const res = await getBridgeData(found.region_id);
          const filtered =
            holatFilter === "all"
              ? res
              : res.filter((b) => b.holat === holatFilter);
          setBridges(filtered);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBridges();
  }, [selectedRegion, statistics, holatFilter, regionId]);

  // --- LocalStorage ---
  useEffect(() => {
    if (selectedRegion) localStorage.setItem("selectedRegion", selectedRegion);
    else localStorage.removeItem("selectedRegion");
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedLocation)
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify(selectedLocation),
      );
    else localStorage.removeItem("selectedLocation");
  }, [selectedLocation]);

  // --- Har bir viloyat ustiga bosish handler ---
  const onEachCountry = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      layer.on({
        mouseover: (e: LeafletMouseEvent) =>
          (e.target as L.Path).setStyle(highlightStyle),
        mouseout: (e: LeafletMouseEvent) =>
          (e.target as L.Path).setStyle(defaultStyle),
        click: (e: LeafletMouseEvent) => {
          const regionName = feature.properties?.NAME_1;
          if (!regionName) return;

          const polygon = e.target as L.Polygon;
          const bounds = polygon.getBounds();

          if (regionName === "Toshkent shahar") {
            mapRef.current?.fitBounds(bounds, {
              maxZoom: 12,
              animate: true,
              duration: 0.8,
            });
          } else {
            const center = regionCenters[regionName];
            if (center && mapRef.current)
              mapRef.current.flyTo(center, 9, { animate: true, duration: 0.8 });
          }

          const found = statistics.find(
            (item) =>
              item.region_name.trim().toLowerCase() ===
              regionName.trim().toLowerCase(),
          );
          if (found) setRegionId(found.region_id);
          setSelectedRegion(regionName);

          setZoomTo(bounds);
        },
      });
      (layer as L.Path).setStyle(defaultStyle);
    },
    [statistics],
  );

  // --- DonutChartWrapper click handler ---
  const handleDonutClick = useCallback((region_name: string) => {
    const center = regionCenters[region_name];
    if (!center || !mapRef.current) return;

    const zoomLevel = region_name === "Toshkent shahar" ? 12 : 9;
    mapRef.current.setView(center, zoomLevel, {
      animate: true,
      duration: 0.8,
      easeLinearity: 0.25,
    });
    setSelectedRegion(region_name);
  }, []);

  // --- Marker click handler ---
  const handleMarkerClick = useCallback(
    (loc: Location) => {
      setSelectedLocation(loc);
      openModal();
    },
    [openModal],
  );

  // --- Bridges select ---
  const selectBridge = useMemo(
    () =>
      bridges.find((bridge) =>
        bridge.locations.some((loc) => loc.id === selectedLocation?.id),
      ),
    [bridges, selectedLocation],
  );

  // --- DonutChartWrapperlar ---
  const donutCharts = useMemo(() => {
    if (!statistics || statistics.length === 0) return null;

    return statistics.map(({ region_name, holat_counts }) => {
      const center = regionCenters[region_name];
      if (!center) return null;

      const filteredData: HolatCounts =
        holatFilter === "all"
          ? holat_counts
          : {
              Jarayonda: 0,
              Rejalashtirilgan: 0,
              Tugallangan: 0,
              [holatFilter]: holat_counts[holatFilter] ?? 0,
            };

      const total = Object.values(filteredData).reduce((a, b) => a + b, 0);
      if (total === 0) return null;

      return (
        <DonutChartWrapper
          key={region_name}
          position={center}
          regionName={region_name}
          data={filteredData}
          onClick={() => handleDonutClick(region_name)}
        />
      );
    });
  }, [statistics, holatFilter, handleDonutClick]);

  // --- Bridges va Markers memo ---
  const bridgeElements = useMemo(() => {
    return bridges.flatMap((bridge) => {
      const sortedLocations = [...bridge.locations].sort((a, b) => a.id - b.id);
      const polylinePositions = sortedLocations
        .map((loc) =>
          loc.latitude && loc.longitude ? [loc.latitude, loc.longitude] : null,
        )
        .filter((pos): pos is [number, number] => Array.isArray(pos));

      const polyline =
        sortedLocations.length >= 2 ? (
          <Polyline
            key={`polyline-${bridge.id}`}
            positions={polylinePositions}
            pathOptions={{
              color: {
                Jarayonda: "#f35a02",
                Tugallangan: "green",
                Rejalashtirilgan: "red",
              }[bridge.holat ?? "Rejalashtirilgan"],
              weight: 3,
              opacity: 1,
            }}
          />
        ) : null;

      let markerPosition: [number, number] | null = null;
      let markerLoc: Location | null = null;
      const count = sortedLocations.length;

      if (count === 1) {
        const loc = sortedLocations[0];
        markerPosition = [loc.latitude, loc.longitude];
        markerLoc = loc;
      } else if (count === 2) {
        const center = calculatePolylineCenter(sortedLocations);
        if (center) {
          markerPosition = center;
          markerLoc = sortedLocations[0];
        }
      } else if (count >= 3) {
        const mid = Math.floor(count / 2);
        const loc = sortedLocations[mid];
        markerPosition = [loc.latitude, loc.longitude];
        markerLoc = loc;
      }

      return [
        polyline,
        markerPosition && markerLoc && (
          <Marker
            key={`bridge-${bridge.id}-marker`}
            position={markerPosition}
            icon={IconStatus(sortedLocations.length, bridge.holat ?? "")}
            eventHandlers={{ click: () => handleMarkerClick(markerLoc) }}
          />
        ),
      ];
    });
  }, [bridges, handleMarkerClick]);

  return (
    <Fragment>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        minZoom={getMinZoom()}
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
        <FilterDropdown onChange={setHolatFilter} />
        <ZoomControl dark:bg-dark-950 position="topleft" />

        {!selectedRegion && donutCharts}

        {selectedRegion && (
          <AllofUzbekistan
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            onClick={() => {
              setSelectedRegion(null);
              setRegionId(null);
              setBridges([]);
              setZoomTo(null);
              mapRef.current?.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM, {
                duration: 0.8,
                easeLinearity: 0.25,
              });
            }}
          />
        )}

        <StatisticPanel />
        {zoomTo && <MapZoomer bounds={zoomTo} />}
        {bridgeElements}
        <GeoJSON
          data={uzb as GeoJSON.GeoJsonObject}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      <InfoModal location={selectedLocation} bridge={selectBridge} />
    </Fragment>
  );
}

export default MyMapPage;
