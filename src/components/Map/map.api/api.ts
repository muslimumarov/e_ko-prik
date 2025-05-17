import axios from "axios";
import {
  BridgeData,
  Statistica,
  StatisticaResponse,
} from "../interfaceslar/map.interfaces.ts";

const api = axios.create({
  baseURL: "http://192.168.100.230:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBridgeData = async (
  regionId: number,
): Promise<BridgeData[]> => {
  const res = await api.get<{ bridges: BridgeData[] }>(
    `/region-bridges/${regionId}/`,
  );
  return res.data.bridges;
};
export const getStatisticsRegion = async (): Promise<StatisticaResponse> => {
  const response = await fetch(
    "http://192.168.100.230:3000/bridge-region-holat-statistics/",
  );
  const data = await response.json();
  return data;
};
export const getBridgeHolat = async (): Promise<Statistica> => {
  const res = await api.get("/bridge-holat-statistics/");
  return res.data;
};
