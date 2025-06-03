import { BridgesResponseArxiv } from "../interfaces/arxiv.interfaces.tsx";
import { api } from "../../../core/hooks/apiUrl.ts";

export const GetBridgeCard = async (
  url?: string,
): Promise<BridgesResponseArxiv> => {
  const response = await api.get(url || "/bridges/?limit=12");
  return response.data;
};
