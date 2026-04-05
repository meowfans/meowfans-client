import { BlurImage } from '@/components/BlurImage';
import { InteractionButton } from '@/components/InteractionButton';
import { useMessageInputStore } from '@/hooks/store/message.store';
import { MessagesOutput } from '@workspace/gql/generated/graphql';
import { Carousel, FileType } from '@workspace/ui/globals/Carousel';
import { Lock, ShoppingCart, Sparkles } from 'lucide-react';

interface SingleMessageAssetsProps {
  message: MessagesOutput;
}

export const SingleMessageAssets: React.FC<SingleMessageAssetsProps> = ({ message }) => {
  const { setSelectedMessage } = useMessageInputStore();

  if (!message.messageAssets || message.messageAssets.length === 0) return null;

  if (message.isPurchased || !message.unlockPrice) {
    return (
      <div className="flex flex-col gap-2 mb-2 z-30 w-70 max-w-full">
        <Carousel
          items={message.messageAssets}
          getKey={(item) => item.id}
          getUrl={(item) => item.rawUrl}
          getFileType={(item) => item.fileType as FileType}
          urls={message.messageAssets.map((asset) => asset.rawUrl)}
        />
      </div>
    );
  }

  const preview = message.messageAssets[0]?.rawUrl;

  return (
    <div className="relative aspect-square w-70 max-w-full overflow-hidden bg-black/40 rounded-xl mb-2 z-30">
      {preview ? (
        <BlurImage src={preview} alt="Message media preview" className="h-full w-full object-cover blur-xl scale-110" loading="eager" />
      ) : (
        <div className="h-full w-full bg-secondary/10 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-muted-foreground/20" />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <div className="mb-3 rounded-2xl bg-white/5 p-3.5 border border-white/10 shadow-xl rotate-3">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-base font-black italic uppercase tracking-tighter text-white mb-1 text-center leading-tight">Content Locked</h3>
        <p className="text-[11px] font-medium text-white/50 mb-4 max-w-50 text-center px-2 leading-snug">
          Unlock to view {message.messageAssets.length} exclusive items.
        </p>

        <InteractionButton
          onClick={() => setSelectedMessage(message)}
          actionName="Unlock Message"
          className="h-10 w-full max-w-55 px-4 rounded-xl bg-primary text-primary-foreground font-black uppercase italic tracking-widest shadow-[0_10px_20px_-5px_rgba(var(--primary),0.4)] hover:scale-105 transition-all text-xs"
        >
          <ShoppingCart className="mr-2 h-3.5 w-3.5" />
          Unlock for ${message.unlockPrice}
        </InteractionButton>
      </div>
    </div>
  );
};
