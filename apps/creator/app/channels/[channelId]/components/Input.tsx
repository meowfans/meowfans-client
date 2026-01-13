'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { BadgeDollarSign, ImagePlus, Send, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { AssetPickerModal } from '../../../../components/modals/AssetPickerModal';

export const MessageInput = () => {
  const [openAssets, setOpenAssets] = useState(false);
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAttach = (url: string) => {
    setAttachments((prev) => (prev.includes(url) ? prev : [url, ...prev].slice(0, 3)));
    setOpenAssets(false);
  };

  const handleRemove = (url: string) => {
    setAttachments((prev) => prev.filter((u) => u !== url));
  };

  const handleSend = () => {
    // UI-only for now
    setText('');
    setAttachments([]);
  };

  return (
    <div className="fixed bottom-0 left-0 md:left-(--sidebar-width) right-0 md:right-(--sidebar-width) border-t bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 p-2">
      <div className="mx-auto w-full max-w-3xl">
        {attachments.length ? (
          <div className="mb-2 flex gap-2 overflow-x-auto">
            {attachments.map((url) => (
              <div key={url} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-muted/10">
                <Image src={url} alt="Attachment" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute -right-2 -top-2 rounded-full border bg-background p-1"
                  aria-label="Remove attachment"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          <div className="relative flex items-center rounded-xl border bg-background/70 backdrop-blur focus-within:ring-1 focus-within:ring-ring px-2 w-full">
            <Button variant={'ghost'} size="icon" aria-label="PPV">
              <BadgeDollarSign className="h-5 w-5 text-muted-foreground" />
            </Button>

            <Button variant={'ghost'} size="icon" aria-label="Attach from assets" onClick={() => setOpenAssets(true)}>
              <ImagePlus className="h-5 w-5 text-muted-foreground" />
            </Button>

            <Input
              placeholder="Enter your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border-0 focus-visible:ring-0 shadow-none"
            />
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Send"
            onClick={handleSend}
            disabled={!text.trim() && !attachments.length}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AssetPickerModal open={openAssets} onClose={() => setOpenAssets(false)} onSelectUrl={handleAttach} />
    </div>
  );
};
