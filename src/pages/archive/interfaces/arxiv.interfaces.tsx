export interface ImageArxiv {
  id: number;
  image: string;
}

export interface BridgeArxiv {
  id: number;
  name: string;
  images: ImageArxiv | null;
}

export interface BridgesResponseArxiv {
  count: number;
  next: string | null;
  previous: string | null;
  results: BridgeArxiv[];
}
