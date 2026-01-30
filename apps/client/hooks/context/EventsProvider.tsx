'use client';

import { configService } from '@/util/config';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { fanCookieKey } from '@workspace/ui/lib/constants';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

export const EventsProvider = () => {
  useEffect(() => {
    const authCookieKey = getCookie(fanCookieKey);

    if (!authCookieKey) return;

    const sseURL = configService.NEXT_PUBLIC_API_URL + `/sse/stream?token=${authCookieKey}`;
    const es = new EventSource(sseURL);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      eventEmitter.dispatchEvent(new CustomEvent(data.type, { detail: data }));
    };

    return () => es.close();
  }, []);

  return null;
};
