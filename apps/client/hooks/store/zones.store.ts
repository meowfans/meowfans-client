import { GetZonePlansOutput } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ZonesStore = {
  openZone: boolean;
  zonePlans: GetZonePlansOutput[];
  setZonePlans: (zonePlans: GetZonePlansOutput[]) => void;
  setOpenZone: (openZone: boolean) => void;
};

export const useZonesStore = create<ZonesStore>()((set) => ({
  openZone: false,
  zonePlans: [],
  setZonePlans: (zonePlans) => set({ zonePlans }),
  setOpenZone: (openZone) => set({ openZone })
}));
