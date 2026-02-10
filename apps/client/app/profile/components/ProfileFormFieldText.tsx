import { useFan } from '@/hooks/context/UserContextWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { motion } from 'framer-motion';
import { LinkIcon } from 'lucide-react';
import React from 'react';

interface ProfileFormFieldTextProps {
  username: string;
  setUsername: (username: string) => void;
}

export const ProfileFormFieldText = ({
  username,
  setUsername,
}: ProfileFormFieldTextProps) => {
  const { fan } = useFan();
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
      <Card className="border-none bg-secondary/10 shadow-xl shadow-primary/5 backdrop-blur-md ring-1 ring-white/5 h-full rounded-[2rem]">
        <CardHeader className="px-8 pt-8">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            Profile Details
          </CardTitle>
          <CardDescription>Your unique identity on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="username" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Username
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold group-focus-within:text-primary transition-colors">
                @
              </div>
              <Input
                id="username"
                value={username}
                autoComplete='username'
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12 bg-background/40 border-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-2xl font-medium transition-all"
                placeholder="johndoe"
              />
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground/60 px-1 italic">
              Username must be unique. It will be used in your profile link.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">First Name</Label>
              <Input
                value={fan?.user.firstName}
                disabled
                autoComplete='given-name'
                className="h-12 bg-secondary/30 border-none opacity-60 cursor-not-allowed rounded-2xl font-medium"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Last Name</Label>
              <Input
                value={fan?.user.lastName}
                disabled
                autoComplete='family-name'
                className="h-12 bg-secondary/30 border-none opacity-60 cursor-not-allowed rounded-2xl font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
