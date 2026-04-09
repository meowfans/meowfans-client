'use client';

import { useVaultsStore } from '@/hooks/store/vaults.store';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes } from '@workspace/ui/lib';
import { useEffect } from 'react';

export const Events = () => {
  const setVaultObjects = useVaultsStore((s) => s.setVaultObjects);

  const updateVaultObjectStatus = async (event: CustomEvent) => {
    const { data } = event.detail;
    const uploadResult = data.uploadResult;

    setVaultObjects((prev) => prev.map((obj) => (obj.id === uploadResult.objectId ? { ...obj, status: uploadResult.status } : obj)));
  };

  useEffect(() => {
    const updateHandler = (e: Event) => updateVaultObjectStatus(e as CustomEvent);

    eventEmitter.addEventListener(EventTypes.VaultObjectStatus, updateHandler);

    return () => {
      eventEmitter.removeEventListener(EventTypes.VaultObjectStatus, updateHandler);
    };
  }, []); // eslint-disable-line

  return null;
};
