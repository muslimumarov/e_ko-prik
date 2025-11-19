import { BridgeData, StatisticaResponse } from "../interfaces/interfaces.ts";
import { api } from "./apiUrl.ts";

// ============================
// 🔹 Bridge ma'lumotlarini olish
// ============================
export const getBridgeData = async (
  regionId: number,
): Promise<BridgeData[]> => {
  try {
    const res = await api.get<{ bridges: BridgeData[] }>(
      `/region-bridges/${regionId}/`,
    );

    console.log("Bridge Data Response:", res.data);

    return res.data.bridges || [];
  } catch (err: any) {
    console.error("getBridgeData ERROR:", err.response?.data || err.message);
    return [];
  }
};

// ============================
// 🔹 Hudud statistikasi
// ============================
export const getStatisticsRegion =
  async (): Promise<StatisticaResponse | null> => {
    try {
      const res = await api.get("/bridge-region-holat-statistics/");
      console.log("Region Statistics Response:", res.data);
      return res.data;
    } catch (err: any) {
      console.error(
        "getStatisticsRegion ERROR:",
        err.response?.data || err.message,
      );
      return null;
    }
  };

// ============================
// 🔹 Ko‘prik holat statistikasi
// ============================
export const getBridgeHolat = async (): Promise<StatisticaResponse | null> => {
  try {
    const res = await api.get("/bridge-holat-statistics/");
    console.log("Bridge Holat Statistics Response:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("getBridgeHolat ERROR:", err.response?.data || err.message);
    return null;
  }
};
