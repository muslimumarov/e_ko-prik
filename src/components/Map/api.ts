// src/api.ts
import axios from "axios";
import { BridgeData, Statistics } from "./map.interfaces.ts";

// Axios instance
const api = axios.create({
  baseURL: "http://192.168.100.230:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Ko‘prikning to‘liq ma’lumotlarini olib keladi (1 ta bridge)
 */
export const getBridgeData = async (id: number): Promise<BridgeData> => {
  const res = await api.get<BridgeData>(`/bridges/${id}/`);
  return res.data;
};

// holatlar paneli uchun api so'rov
export const getBridgeHolatStatistics = async (): Promise<Statistics> => {
  const res = await axios.get(
    "http://192.168.100.230:3000/bridge-holat-statistics/",
  );
  return res.data;
};
export const getRegionBridges = async (regionId: number): Promise<any> => {
  const res = await api.get(`/region-bridges/${regionId}`);
  return res.data;
};
