'use client';

import { Creator } from '@/components/Creator';
import { LikeButton } from '@/components/LikeButton';
import { useLikes } from '@/hooks/useLikes';
import { AssetsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  short: AssetsEntity;
  globalMute: boolean;
  onSetGlobalMute: (mute: boolean) => unknown;
};

export const ShortVideoCard: React.FC<Props> = ({ globalMute, onSetGlobalMute, short }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { likeVaultObject } = useLikes();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleTogglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isPlaying) {
      vid.pause();
      setIsPlaying(false);
    } else {
      vid.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;

    const newMute = !globalMute;
    onSetGlobalMute(newMute);
    vid.muted = newMute;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        src={short.rawUrl}
        className="w-full h-full object-cover"
        playsInline
        muted={globalMute}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
        onClick={handleTogglePlay}
      />

      <div
        className={`
          absolute bottom-0 left-0 z-10 w-full
          bg-linear-to-t from-black/80 via-black/30 to-transparent
          p-3 flex justify-between items-end
        `}
      >
        <div className="flex flex-col">
          <Creator username={short.creatorProfile.user.username} avatarUrl={short.creatorProfile.user.avatarUrl!} />
          <div className="mt-1 text-sm opacity-90">
            {short.vaultObject?.vault?.description!.replace(/\s*\|\s*MeowFans\.App\s*/g, '').trim()}
          </div>
        </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center" onClick={handleTogglePlay}>
          <Play size={65} className="text-white opacity-80" />
        </div>
      )}

      <div className="absolute right-4 bottom-20 flex flex-col gap-6 text-white">
        <LikeButton
          isLiked={short.vaultObject?.isLiked || false}
          onLikeDisLike={() => likeVaultObject(short.vaultObjectId as string)}
          className="p-3 rounded-full"
          variant={'default'}
        />

        <Button className="p-3 rounded-full" onClick={handleTogglePlay}>
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </Button>

        <Button className="p-3 rounded-full" onClick={handleToggleMute}>
          {globalMute ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </Button>
      </div>
    </div>
  );
};
