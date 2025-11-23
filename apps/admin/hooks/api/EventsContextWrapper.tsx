'use client';

import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { useEffect } from 'react';

export const EventsProvider = () => {
  useEffect(() => {
    const sseURL = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/sse/stream' });
    const es = new EventSource(sseURL);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      eventEmitter.dispatchEvent(new CustomEvent(data.type, { detail: data }));
    };

    return () => es.close();
  }, []);

  return null;
};
