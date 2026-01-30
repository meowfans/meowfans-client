'use client';

import { configService } from '@/util/config';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export const EventsProvider = () => {
  const [retry, setRetry] = useState<number>(0);
  useEffect(() => {
    const authCookieKey = getCookie(creatorCookieKey);

    if (!authCookieKey) return;

    const sseURL = configService.NEXT_PUBLIC_API_URL + `/sse/stream?token=${authCookieKey}`;
    const es = new EventSource(sseURL);

    es.onerror = () => {
      setRetry((prev) => prev + 1);

      if (retry > 10) {
        console.log('Connection is closed');
        es.close();
      }
    };

    es.onopen = () => {
      setRetry(0);
    };

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      eventEmitter.dispatchEvent(new CustomEvent(data.type, { detail: data }));
    };

    return () => es.close();
  }, []);

  return null;
};
