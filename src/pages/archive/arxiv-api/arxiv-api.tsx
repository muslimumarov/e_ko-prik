// src/modules/archive/api/arxiv-api.ts
import {
  BridgesResponseArxiv,
  BridgeFilters,
} from "../interfaces/arxiv.interfaces";
import { api } from "../../../core/hooks/apiUrl"; // axios instance

export const GetBridgeCard = async (
  filters: BridgeFilters,
): Promise<BridgesResponseArxiv> => {
  const params = new URLSearchParams();

  if (filters.region) params.append("region", filters.region);
  if (filters.holat) params.append("holat", filters.holat);
  if (filters.search) params.append("search", filters.search);
  if (filters.date) params.append("date", filters.date);

  // limit va offset har doim mavjud bo‘lishi mumkin
  params.append("limit", filters.limit?.toString() || "12");
  if (filters.offset) params.append("offset", filters.offset.toString());

  const response = await api.get<BridgesResponseArxiv>(
    `/bridges/?${params.toString()}`,
  );
  return response.data;
};
