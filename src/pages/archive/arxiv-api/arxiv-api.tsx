import {
  BridgeFilters,
  BridgesResponseArxiv,
} from "../interfaces/arxiv.interfaces";
import { api } from "../../../core/hooks/apiUrl.ts";

export const GetBridgeCard = async (
  filters: BridgeFilters,
): Promise<BridgesResponseArxiv> => {
  const params = new URLSearchParams();

  if (filters.region) params.append("region", filters.region);
  if (filters.holat) params.append("holat", filters.holat);
  if (filters.search) params.append("search", filters.search);
  if (filters.date) params.append("boshlash_vaqti", filters.date);
  params.append("limit", filters.limit?.toString() || "12");
  if (filters.offset) params.append("offset", filters.offset.toString());

  const response = await api.get(`/bridges/?${params.toString()}`);
  return response.data;
};
