import { ZonePlansEntity } from '@workspace/gql/generated/graphql';
import { create } from 'zustand';

type ZonesStore = {
  openZone: boolean;
  zonePlans: ZonePlansEntity[];
  setZonePlans: (zonePlans: ZonePlansEntity[]) => void;
  setOpenZone: (openZone: boolean) => void;
};

export const useZonesStore = create<ZonesStore>()((set) => ({
  openZone: false,
  zonePlans: [],
  setZonePlans: (zonePlans) => set({ zonePlans }),
  setOpenZone: (openZone) => set({ openZone })
}));
