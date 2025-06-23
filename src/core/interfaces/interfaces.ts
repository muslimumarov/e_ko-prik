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
  name: string; // Qo'shildi, server javobida bor
  region: Region;
  district: District;
  holat: string | null;
  loyiha: string | null; // yangi, null bo'lishi mumkin
  pudratchi: string | null; // yangi, null bo'lishi mumkin
  loyihachi: string | null; // yangi, null bo'lishi mumkin
  boshlash_vaqti: string | null;
  tugash_vaqti?: string | null;
  asos_hujjat?: string | null;
  buyrutmachi?: string;
  texnik_parametrlari: string | null;
  obyektning_umumiy_summasi?: string | null; // optional, agar kerak bo'lsa
  images: Image[];
  locations: Location[];
  vaqtinchalik_yol_sxemasi?: string | null; // optional, server javobida bor, hozircha null
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
export interface HolatCounts {
  Jarayonda: number;
  Rejalashtirilgan: number;
  Tugallangan: number;
  [key: string]: number; // 🔧 qo‘shiladi
}
