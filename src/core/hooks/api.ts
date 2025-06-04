import { BridgeData, StatisticaResponse } from "../interfaces/interfaces.ts";
import { api } from "./apiUrl.ts";

// bridge ma'lumotlarini olish
export const getBridgeData = async (
  regionId: number,
): Promise<BridgeData[]> => {
  const res = await api.get<{ bridges: BridgeData[] }>(
    `/region-bridges/${regionId}/`,
  );
  return res.data.bridges;
};

// hudud statistikasi
export const getStatisticsRegion = async (): Promise<StatisticaResponse> => {
  const response = await api.get("/bridge-region-holat-statistics/");
  return response.data;
};

// ko‘prik holat statistikasi
export const getBridgeHolat = async (): Promise<StatisticaResponse> => {
  const res = await api.get("/bridge-holat-statistics/");
  return res.data;
};
