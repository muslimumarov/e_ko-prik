export interface Image {
  id: number;
  image: string;
}

export interface Location {
  id: number;
  name: string;
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
  holat: string;
  buyrutmachi: string;
  proekt: string | null;
  texnik_parametrlari: string | null;
  obyektning_umumiy_summasi: string | null;
  boshlash_vaqti: string | null;
  tugash_vaqti: string | null;
  asos_hujjat: string | null;
  region: Region; // ✅ object bo'ldi
  district: District;
  images: Image[]; // ✅ to‘g‘rilandi
  locations: Location[];
}

export interface Statistics {
  Jarayonda: number;
  Rejalashtirilgan: number;
  Tugallangan: number;
}
