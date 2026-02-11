'use client';

import { BlurVideo } from '@/components/BlurVideo';
import { useContentBlur } from '@/hooks/client/useContentBlur';
import { useLikeMutations } from '@/hooks/client/useLikeMutations';
import { GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MessageCircle, Play, Share2, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ShortCardProps {
  short: GetPublicShortsOutput;
  isActive: boolean;
  globalMute: boolean;
  onSetGlobalMute: (mute: boolean) => unknown;
}

export function ShortCard({ short, isActive, globalMute, onSetGlobalMute }: ShortCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState<boolean>(short?.vaultObjectIsLiked ?? false);
  const [showHeartAnim, setShowHeartAnim] = useState<boolean>(false);
  const { likeVaultObject } = useLikeMutations();
  const [isPlaying, setIsPlaying] = useState(false);

  // Content Blur Logic
  const { isBlurEnabled } = useContentBlur();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          if (!isBlurEnabled) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isBlurEnabled]); // Re-run intersection logic when blur state changes

  const handleToggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;

    const newMute = !globalMute;
    onSetGlobalMute(newMute);
    vid.muted = newMute;
  };

  const togglePlay = () => {
    if (isBlurEnabled) return; // Prevent playing if blurred

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isBlurEnabled) return; // Prevent like action if blurred

    if (!isLiked) {
      setIsLiked(true);
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 1000);
    }
  };

  return (
    <>
      <div className="relative h-full w-full snap-start overflow-hidden flex items-center justify-center">
        <BlurVideo
          ref={videoRef}
          src={short.rawUrl as string}
          className="h-full w-full"
          loop
          playsInline
          onClick={togglePlay}
          onDoubleClick={handleDoubleClick}
        />

        {/* Play/Pause Indicator Overlay */}
        <AnimatePresence>
          {!isPlaying && !isBlurEnabled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className=" p-4 rounded-full">
                <Play className="h-12 w-12 text-white fill-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double Tap Heart Animation */}
        <AnimatePresence>
          {showHeartAnim && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1.5, y: -20 }}
              exit={{ opacity: 0, scale: 2, y: -100 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >
              <Heart className="h-24 w-24 text-red-500 fill-red-500 shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side Actions */}
        <div
          className={cn(
            'absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10 transition-opacity duration-300',
            isBlurEnabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="flex flex-col items-center gap-1 group">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-md hover:bg-secondary/60 transition-all',
                isLiked && 'text-red-500'
              )}
              onClick={() => likeVaultObject(short.vaultObjectId as string)}
            >
              <Heart className={cn('h-7 w-7', isLiked && 'fill-current')} />
            </Button>
            <span className="text-[10px] font-bold shadow-sm">Like</span>
          </div>

          <div className="flex flex-col items-center gap-1 group">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-md hover:bg-secondary/60 transition-all"
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
            <span className="text-[10px] font-bold shadow-sm">Reply</span>
          </div>

          <div className="flex flex-col items-center gap-1 group">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-md hover:bg-secondary/60 transition-all"
            >
              <Share2 className="h-7 w-7" />
            </Button>
            <span className="text-[10px] font-bold shadow-sm">Share</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-md hover:bg-secondary/60 transition-all mt-4"
            onClick={handleToggleMute}
          >
            {globalMute ? <VolumeX size={22} /> : <Volume2 size={22} />}
          </Button>
        </div>

        {/* Bottom Info Overlay */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent pt-20 transition-opacity duration-300',
            isBlurEnabled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-border/50">
                  <AvatarImage src={short.creatorAvatarUrl} />
                  <AvatarFallback className="bg-primary/20 font-bold">{short.creatorUsername?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-tight">@{short.creatorUsername}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Now</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="rounded-full h-8 px-4 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-wider ml-2 shadow-lg shadow-primary/20"
                >
                  Follow
                </Button>
              </div>

              <p className="text-sm font-medium leading-relaxed line-clamp-2 max-w-[80%]">
                {short.vaultDescription || 'Check out this amazing short! ✨ #MeowFans #Exclusive'}
              </p>
            </div>
          </div>
        </div>

        {/* Top Banner (Optional brand touch) */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.4em]">Shorts Feed</span>
        </div>
      </div>
    </>
  );
}
