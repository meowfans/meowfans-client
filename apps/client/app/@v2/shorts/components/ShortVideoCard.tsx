'use client';

import { useLikeMutations } from '@/hooks/useLikeMutations';
import { GetPublicShortsOutput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MessageCircle, MoreVertical, Music, Play, Share2, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  short: GetPublicShortsOutput;
  globalMute: boolean;
  onToggleMute: () => void;
};

const Plus = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ShortVideoCard: React.FC<Props> = ({ short, globalMute, onToggleMute }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { likeVaultObject } = useLikeMutations();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(short.vaultObjectIsLiked || false);
  const [showHeart, setShowHeart] = useState(false);
  const [progress, setProgress] = useState(0);

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
          video.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    await likeVaultObject(short.vaultObjectId as string);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isLiked) handleLike();
    else {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `@${short.creatorUsername} on MeowFans`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Centered Video Container */}
      <div className="relative h-full w-full md:max-w-[450px] bg-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={short.rawUrl}
          className="h-full w-full object-cover"
          loop
          playsInline
          muted={globalMute}
          onTimeUpdate={handleTimeUpdate}
          onClick={handleTogglePlay}
          onDoubleClick={handleDoubleClick}
        />

        {/* Like Animation Overlay */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute z-50 pointer-events-none"
            >
              <Heart className="fill-red-500 text-red-500 size-24 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause Overlay Icon */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10 cursor-pointer" onClick={handleTogglePlay}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-md rounded-full p-6"
            >
              <Play size={48} className="text-white fill-white ml-1" />
            </motion.div>
          </div>
        )}

        {/* Right Interaction Sidebar */}
        <div className="absolute right-2 bottom-20 flex flex-col gap-4 z-30">
          <div className="flex flex-col items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleLike}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                isLiked ? 'bg-red-500/20 text-red-500' : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Heart className={`size-6 md:size-7 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <span className="text-[9px] font-bold text-white shadow-sm uppercase tracking-tighter">Like</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Link href={`/creators/${short.creatorUsername}`} className="p-0">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Avatar className="size-10 md:size-11 border-2 border-indigo-500 p-0.5 bg-black">
                  <AvatarImage src={short.creatorAvatarUrl!} className="rounded-full object-cover" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-indigo-500 rounded-full p-0.5">
                  <Plus className="size-2 text-white" />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Link href={`/creators/${short.creatorUsername}`}>
              <button className="p-2.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40">
                <MessageCircle className="size-6 md:size-7" />
              </button>
            </Link>
            <span className="text-[9px] font-bold text-white shadow-sm uppercase tracking-tighter">Chat</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <button onClick={handleShare} className="p-2.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40">
              <Share2 className="size-6 md:size-7" />
            </button>
            <span className="text-[9px] font-bold text-white shadow-sm uppercase tracking-tighter">Share</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <button onClick={onToggleMute} className="p-2.5 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40">
              {globalMute ? <VolumeX className="size-6 md:size-7" /> : <Volume2 className="size-6 md:size-7" />}
            </button>
          </div>
        </div>

        {/* Bottom Information Section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-10 pt-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
          <div className="flex flex-col gap-2.5 pointer-events-auto">
            <Link href={`/creators/${short.creatorUsername}`} className="flex items-center gap-2 group/author w-fit">
              <span className="text-base font-bold text-white hover:underline drop-shadow-md">@{short.creatorUsername}</span>
              <div className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm">
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Creator</span>
              </div>
            </Link>

            <p className="text-xs md:text-sm text-zinc-100 line-clamp-2 leading-relaxed drop-shadow-sm max-w-[85%]">
              {short.vaultDescription?.replace(/\s*\|\s*MeowFans\.App\s*/g, '').trim()}
            </p>

            <div className="flex items-center gap-2 overflow-hidden max-w-[70%]">
              <Music className="size-3 text-white/70 shrink-0" />
              <div className="flex whitespace-nowrap overflow-hidden">
                <motion.span
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="text-[10px] font-medium text-white/60 pr-10"
                >
                  Original sound - {short.creatorUsername}
                </motion.span>
                <motion.span
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="text-[10px] font-medium text-white/60"
                >
                  Original sound - {short.creatorUsername}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <motion.div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }} />
        </div>

        {/* Top Header Actions */}
        <div className="absolute top-0 left-0 right-0 z-30 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 via-black/20 to-transparent">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-white/80 tracking-[0.2em] uppercase">Shorts</span>
          </div>
          <button className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <MoreVertical className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
