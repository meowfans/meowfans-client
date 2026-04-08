import { GetZonePlansOutput } from '@workspace/gql/generated/graphql';
import { Updater } from '@workspace/ui/lib/types';
import { create } from 'zustand';

type ZonesStore = {
  openZone: boolean;
  zonePlans: GetZonePlansOutput[];
  setZonePlans: (updater: Updater<GetZonePlansOutput[]>) => void;
  setOpenZone: (updater: Updater<boolean>) => void;
};

export const useZonesStore = create<ZonesStore>()((set) => ({
  openZone: false,
  zonePlans: [],
  setZonePlans: (updater) => set((state) => ({ zonePlans: typeof updater === 'function' ? updater(state.zonePlans) : updater })),
  setOpenZone: (updater) => set((state) => ({ openZone: typeof updater === 'function' ? updater(state.openZone) : updater }))
}));
