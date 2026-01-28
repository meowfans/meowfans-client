'use client';

import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { EventTypes } from '@workspace/ui/lib/enums';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const VaultsSSE = () => {
  const onVaultDownloadCompleted = (event: CustomEvent) => {
    const { data } = event.detail;
    toast.success('test operation started', {
      description: data.message,
      closeButton: true,
      position: 'bottom-center'
    });
  };

  useEffect(() => {
    eventEmitter.addEventListener(EventTypes.Ping, (event) => onVaultDownloadCompleted(event as any));

    return () => {
      eventEmitter.removeEventListener(EventTypes.Ping, (event) => onVaultDownloadCompleted(event as any));
    };
  }, []);
  return null;
};
