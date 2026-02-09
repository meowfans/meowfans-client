'use client';

import { useCommentMutations } from '@/hooks/useCommentMutations';
import { usePostComments } from '@/hooks/usePostComments';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { Spinner } from '@workspace/ui/components/spinner';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, Smile, Sparkles } from 'lucide-react';
import { useState } from 'react';

const QUICK_EMOJIS = ['🔥', '❤️', '😍', '🙌', '👏', '✨', '💯', '😂'];
const EXTENDED_EMOJIS = [
  '😊',
  '😇',
  '🫡',
  '🤔',
  '🤫',
  '🫠',
  '🥺',
  '🥳',
  '🚀',
  '💎',
  '🌈',
  '🎉',
  '💥',
  '🎈',
  '⭐',
  '🍀',
  '👀',
  '👅',
  '🍑',
  '🍆',
  '💦',
  '🔞',
  '🔥',
  '💀'
];

interface PostCommentsProps {
  postId: string;
}

export function PostComments({ postId }: PostCommentsProps) {
  const [commentText, setCommentText] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const { postComments, loading, hasMore, handleLoadMore } = usePostComments({
    take: 20,
    relatedEntityId: postId
  });
  const { createComment, loading: isSubmitting } = useCommentMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;

    await createComment(postId, commentText.trim());
    setCommentText('');
  };

  const addEmoji = (emoji: string) => {
    setCommentText((prev) => prev + emoji);
  };

  return (
    <div className="mt-8 md:mt-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-0">
        <h3 className="text-lg md:text-xl  flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          Comments
          <span className="ml-2 px-2 py-0.5 rounded-md bg-secondary/20 text-[10px] md:text-xs not-italic font-bold text-muted-foreground">
            {postComments.length}
          </span>
        </h3>
      </div>

      {/* Input Area */}
      <div className="space-y-4">
        {/* Quick Emojis */}
        <div className="flex items-center gap-2 px-1 overflow-x-auto no-scrollbar">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => addEmoji(emoji)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 border border-white/5 hover:bg-secondary/30 hover:scale-110 active:scale-90 transition-all text-base"
            >
              {emoji}
            </button>
          ))}

          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all"
              >
                <Smile className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="w-64 p-3 bg-background/90 backdrop-blur-3xl border-white/10 rounded-[1.5rem] shadow-2xl">
              <div className="grid grid-cols-6 gap-2">
                {[...QUICK_EMOJIS, ...EXTENDED_EMOJIS].map((emoji, idx) => (
                  <button
                    key={`${emoji}-${idx}`}
                    onClick={() => {
                      addEmoji(emoji);
                      setIsEmojiPickerOpen(false);
                    }}
                    className="h-8 w-8 flex items-center justify-center text-lg hover:bg-white/5 rounded-lg transition-colors active:scale-90"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative group">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem] bg-secondary/10 border border-white/5 focus-within:border-primary/30 transition-all backdrop-blur-3xl shadow-xl shadow-black/20"
          >
            <div className="flex-1 flex items-center gap-3 px-2 md:px-4">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Spill your thoughts..."
                className="bg-transparent border-none focus-visible:ring-0 placeholder:text-muted-foreground/30 font-bold italic tracking-tight h-10 md:h-12 text-sm md:text-base"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              disabled={!commentText.trim() || isSubmitting}
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-[1rem] md:rounded-[1.25rem] bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
            >
              {isSubmitting ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4 md:space-y-6">
        {loading && postComments.length === 0 ? (
          <div className="py-12 flex justify-center">
            <Spinner />
          </div>
        ) : postComments.length === 0 ? (
          <div className="py-16 md:py-24 text-center border border-dashed border-white/5 rounded-[2rem] md:rounded-[3rem] bg-secondary/[0.02]">
            <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/20 mb-4" />
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/30">
              Silence is golden. Be the first to break it.
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {postComments.map((comment, idx) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                  className="flex gap-4 md:gap-5 group"
                >
                  <div className="flex-shrink-0">
                    <div className="p-0.5 rounded-full border border-white/5 bg-secondary/10">
                      <SAvatar url={comment.fanProfile?.user?.avatarUrl} className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1 md:gap-2 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs md:text-sm  text-foreground/80">{comment.fanProfile?.user?.username || 'Anonymous'}</span>
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="relative px-4 md:px-5 py-3 md:py-4 rounded-2xl md:rounded-[1.5rem] bg-secondary/10 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-sm md:text-base font-medium leading-relaxed text-foreground/70">{comment.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {hasMore && (
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  variant="ghost"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary hover:bg-transparent transition-colors"
                >
                  {loading ? <Spinner className="mr-2" /> : 'Load More Experiences'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
