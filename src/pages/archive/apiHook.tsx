import { BridgesResponse } from "./interfaces/arxiv.interfaces.tsx";

export async function fetchBridges(
  limit = 10,
  offset = 0,
): Promise<BridgesResponse> {
  const url = `http://192.168.100.230:3000/bridges/?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Serverdan malumotlarni olishda xatolik yuz berdi");
  }

  const data: BridgesResponse = await response.json();
  return data;
}
