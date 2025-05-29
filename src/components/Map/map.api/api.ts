import {
  BridgeData,
  StatisticaResponse,
} from "../interfaces/map.interfaces.ts";
import { api } from "../../../core/hooks/apiUrl.ts";

export const getBridgeData = async (
  regionId: number,
): Promise<BridgeData[]> => {
  const res = await api.get<{ bridges: BridgeData[] }>(
    `/region-bridges/${regionId}/`,
  );
  return res.data.bridges;
};

export const getStatisticsRegion = async (): Promise<StatisticaResponse> => {
  const response = await api.get("/bridge-region-holat-statistics/");
  return response.data;
};

export const getBridgeHolat = async (): Promise<StatisticaResponse> => {
  const res = await api.get("/bridge-holat-statistics/");
  return res.data;
};
