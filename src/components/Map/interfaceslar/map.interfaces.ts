export interface Image {
  id: number;
  image: string;
}

export interface Location {
  id: number;
  name: string | null;
  order: number;
  longitude: number;
  latitude: number;
  bridge: number;
}

export interface Region {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface BridgeData {
  id: number;
  name: string;
  koprik_turi: string;
  holat: string | null;
  buyrutmachi?: string;
  proekt: string | null;
  texnik_parametrlari: string | null;
  obyektning_umumiy_summasi: string | null;
  boshlash_vaqti: string | null;
  tugash_vaqti: string | null;
  asos_hujjat: string | null;
  region: Region;
  district: District;
  images: Image[];
  locations: Location[];
}
export interface HolatCounts {
  Jarayonda: number;
  Rejalashtirilgan: number;
  Tugallangan: number;
}

export interface StatistikaType {
  region_id: number;
  region_name: string;
  holat_counts: HolatCounts;
}

export type StatisticaResponse = StatistikaType[];
export interface holatStatistica {
  Jarayonda?: number;
  Rejalashtirilgan?: number;
  Tugallangan?: number;
}
