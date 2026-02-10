import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Card } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { Check, Image as ImageIcon, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

interface ProfileBannerAndAvatarSectionProps {
  username: string;
  avatarUrl: string;
  bannerUrl: string;
  fullName: string;
}

export const ProfileBannerAndAvatarSection = ({ username, avatarUrl, bannerUrl, fullName }: ProfileBannerAndAvatarSectionProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="overflow-hidden border-none bg-secondary/10 shadow-2xl shadow-primary/5 rounded-[2rem] ring-1 ring-white/5">
        <div className="relative h-48 md:h-72 bg-gradient-to-br from-primary/30 via-primary/10 to-background group">
          {bannerUrl ? (
            <Image
              src={bannerUrl}
              alt="Banner"
              width={300}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-20">
              <ImageIcon className="h-16 w-16" />
            </div>
          )}
        </div>

        <div className="px-6 md:px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 -mt-16 md:-mt-20">
            <div className="relative group/avatar">
              <Avatar className="h-32 w-32 md:h-44 md:w-44 border-[6px] border-background shadow-2xl transition-transform duration-500 group-hover/avatar:scale-[1.02]">
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-4xl font-black text-primary uppercase">
                  {username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Avatar</span>
              </div>
            </div>

            <div className="flex-1 space-y-1 text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{fullName}</h2>
                <Check className="h-5 w-5 text-primary fill-primary/10" />
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-medium">
                <UserIcon className="h-4 w-4" />
                <span>@{username}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
