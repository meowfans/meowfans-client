'use client';

import { configService } from '@/util/config';
import { eventEmitter } from '@workspace/ui/hooks/EventsEmitter';
import { fanCookieKey } from '@workspace/ui/lib/constants';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

export const EventsProvider = () => {
  useEffect(() => {
    const authCookieKey = getCookie(fanCookieKey);

    if (!authCookieKey) return;

    const sseURL = buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: `/sse/stream/${authCookieKey}` });
    const es = new EventSource(sseURL);

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      eventEmitter.dispatchEvent(new CustomEvent(data.type, { detail: data }));
    };

    return () => es.close();
  }, []);

  return null;
};
