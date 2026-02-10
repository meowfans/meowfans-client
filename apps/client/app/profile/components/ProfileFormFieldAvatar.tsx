import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { AVATAR_OPTIONS } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Check, UserIcon } from 'lucide-react';
import Image from 'next/image';

interface ProfileFormFieldAvatarProps {
  avatarUrl: string;
  setAvatarUrl: (avatarUrl: string) => void;
}

export const ProfileFormFieldAvatar = ({ avatarUrl, setAvatarUrl }: ProfileFormFieldAvatarProps) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
      <Card className="border-none bg-secondary/10 shadow-xl shadow-primary/5 backdrop-blur-md ring-1 ring-white/5 h-full rounded-[2rem] flex flex-col">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            Select Avatar
          </CardTitle>
          <CardDescription>Choose from our exclusive SVG collection.</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="grid grid-cols-5 gap-4">
            {AVATAR_OPTIONS.map((url, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setAvatarUrl(url)}
                className={cn(
                  'relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 group',
                  avatarUrl === url ? 'ring-4 ring-primary ring-offset-4 ring-offset-background' : 'hover:ring-2 hover:ring-primary/40'
                )}
              >
                <Image src={url} alt={`Avatar option ${index + 1}`} fill className="object-cover p-2" />
                {avatarUrl === url && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
