export interface ImageArxiv {
  id: number;
  image: string;
}

export interface BridgeArxiv {
  id: number;
  name: string;
  images: ImageArxiv | null;
  boshlash_vaqti?: string;
}

export interface BridgesResponseArxiv {
  count: number;
  next: string | null;
  previous: string | null;
  results: BridgeArxiv[];
}
export interface BridgeFilters {
  region: string;
  holat: string;
  search: string;
  date?: string;
  limit?: number;
  offset?: number;
}
