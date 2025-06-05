// // state/useMapState.ts (Zustand ishlatilyapti)
// import { create } from "zustand";
//
// interface MapState {
//   regionId: string | null;
//   locationId: string | null;
//   isModalOpen: boolean;
//   setRegion: (id: string) => void;
//   setLocation: (id: string) => void;
//   setModal: (open: boolean) => void;
// }
//
// export const useMapState = create<MapState>((set) => ({
//   regionId: null,
//   locationId: null,
//   isModalOpen: false,
//   setRegion: (id) => set({ regionId: id }),
//   setLocation: (id) => set({ locationId: id }),
//   setModal: (open) => set({ isModalOpen: open }),
// }));
