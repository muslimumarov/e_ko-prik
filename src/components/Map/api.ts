import axios from "axios";
import { BridgeData, Statistica } from "./map.interfaces";

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
export const getStatisticsRegion = async (): Promise<Statistica> => {
  const res = await api.get<Statistica>("/bridge-region-holat-statistics/");
  return res.data;
};

export const getBridgeHolat = async (): Promise<Statistica> => {
  const res = await api.get("/bridge-holat-statistics/");
  return res.data;
};
