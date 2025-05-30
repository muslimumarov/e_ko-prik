import { BridgesResponseArxiv } from "../interfaces/arxiv.interfaces.tsx";
import { api } from "../../../core/hooks/apiUrl.ts";

export const GetBridgeCard = async (): Promise<BridgesResponseArxiv> => {
  const response = await api.get("/bridges");
  return response.data;
};
