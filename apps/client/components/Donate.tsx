'use client';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface StyleDefs<T> {
  donateBtn?: T;
  panel?: T;
  closeBtn?: T;
  closeIcon?: T;
  profileLink?: T;
}

export interface DonateProps {
  children?: React.ReactNode;
  username: string;
  userId?: string;
  entityId?: string;
  amount?: number; // fixed amount
  classNames?: StyleDefs<string>;
  styles?: React.CSSProperties;
  onToggle?: (open: boolean) => void;
}

export default function Donate({
  children,
  username,
  userId,
  entityId,
  amount = 50,
  classNames = {},
  styles = {},
  onToggle = () => {}
}: DonateProps) {
  const [open, setOpen] = useState(false);
  const [loadingIframe, setLoadingIframe] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const baseUrl = `https://ko-fi.com/${username}`;
  const message = `Good luck with the integration! userId:${userId ?? 'unknown'}/entityId:${entityId ?? 'unknown'}`;

  const iframeSrc = `${baseUrl}?amount=${encodeURIComponent(amount.toString())}&message=${encodeURIComponent(
    message
  )}&hidefeed=true&widget=true&embed=true`;

  const handleToggle = (isOpen: boolean) => {
    setOpen(isOpen);
    onToggle(isOpen);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://ko-fi.com') return;
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={() => handleToggle(true)}
        className={cn(
          'rounded-full px-4 py-2 font-semibold text-sm cursor-pointer hover:opacity-90 bg-blue-500 text-white transition',
          classNames.donateBtn
        )}
        style={styles}
      >
        {children ?? `Donate $${amount}`}
      </Button>

      {open && (
        <div className={cn('fixed inset-0 bg-black/50 flex justify-center items-center z-50', classNames.panel)}>
          <div className="relative bg-white rounded-lg w-[90%] max-w-lg h-[80%] p-4 flex flex-col">
            <Button
              className={cn('absolute top-2 right-2 p-1', classNames.closeBtn, classNames.closeIcon)}
              onClick={() => handleToggle(false)}
            >
              <X />
            </Button>

            <div className="flex-1 overflow-hidden rounded-lg border">
              {loadingIframe && <div className="flex justify-center items-center h-full text-gray-500">Loading Ko-fi widget...</div>}
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                onLoad={() => setLoadingIframe(false)}
                style={{
                  border: 'none',
                  width: '100%',
                  height: '100%',
                  background: '#f9f9f9',
                  transition: 'opacity 0.3s ease',
                  opacity: loadingIframe ? 0 : 1
                }}
                title={`${username}-donate`}
              />
            </div>

            <div className={cn('text-center mt-2', classNames.profileLink)}>
              <a href={baseUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                ko-fi.com/{username}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
