// Ko'prikga oid obyektlar uchun interfacelar

export interface Region {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

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

export interface Bridge {
  id: number;
  region: Region;
  district: District | null;
  holat: string;
  loyiha: string | null;
  pudratchi: string | null;
  loyihachi: string | null;
  boshlash_vaqti: string | null;
  tugash_vaqti: string | null;
  asos_hujjat: string | null;
  images: Image[];
  locations: Location[];
  vaqtinchalik_yol_sxemasi: string | null;
  name: string;
  buyrutmachi: string;
  texnik_parametrlari: string | null;
}

export interface BridgesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bridge[];
}
