'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useFanProfile } from '@/hooks/useFanProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Loading } from '@workspace/ui/globals/Loading';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Check, Image as ImageIcon, Link as LinkIcon, Loader2, Save, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ProfileView() {
  const { fan } = useFan();
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const { updateProfile, loading: updating } = useFanProfile();

  const AVATAR_OPTIONS = [
    'https://meowfans-media.sfo3.cdn.digitaloceanspaces.com/random1.svg',
    'https://meowfans-media.sfo3.cdn.digitaloceanspaces.com/random2.svg',
    'https://meowfans-media.sfo3.cdn.digitaloceanspaces.com/random3.svg',
    'https://meowfans-media.sfo3.cdn.digitaloceanspaces.com/random4.svg',
    'https://meowfans-media.sfo3.cdn.digitaloceanspaces.com/random5.svg'
  ];

  useEffect(() => {
    if (fan?.user) {
      setUsername(fan.user.username || '');
      setAvatarUrl(fan.user.avatarUrl || '');
      setBannerUrl(fan.user.bannerUrl || '');
    }
  }, [fan]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ username, avatarUrl, bannerUrl });
  };

  if (!fan) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-screen">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-sm md:text-base font-medium text-muted-foreground/80">
          Personalize your account and how others see you on MeowFans.
        </p>
      </motion.div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Banner and Avatar section */}
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
                      {fan.user.username?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Avatar</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1 text-center md:text-left mb-2">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                      {fan.user.firstName} {fan.user.lastName}
                    </h2>
                    <Check className="h-5 w-5 text-primary fill-primary/10" />
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-medium">
                    <UserIcon className="h-4 w-4" />
                    <span>@{fan.user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      value={fan.user.firstName}
                      disabled
                      className="h-12 bg-secondary/30 border-none opacity-60 cursor-not-allowed rounded-2xl font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                    <Input
                      value={fan.user.lastName}
                      disabled
                      className="h-12 bg-secondary/30 border-none opacity-60 cursor-not-allowed rounded-2xl font-medium"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                        avatarUrl === url
                          ? 'ring-4 ring-primary ring-offset-4 ring-offset-background'
                          : 'hover:ring-2 hover:ring-primary/40'
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-none bg-secondary/10 shadow-xl shadow-primary/5 backdrop-blur-md ring-1 ring-white/5 h-full rounded-[2rem] flex flex-col">
              <CardHeader className="px-8 pt-8 text-center md:text-left">
                <CardTitle className="text-xl font-bold">Fan Status</CardTitle>
                <CardDescription>Verified account privileges.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 flex-1 flex flex-col justify-center gap-6">
                <div className="p-6 rounded-[1.5rem] bg-primary/10 border border-primary/20 flex items-start gap-4 transition-transform hover:scale-[1.02] duration-300">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-foreground">Active Subscription Access</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      You are eligible to subscribe to premium creators, unlock exclusive vaults, and engage in direct messaging.
                    </p>
                  </div>
                </div>

                <div className="text-center px-4">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-40">
                    MeowFans Member Since {new Date(fan.createdAt).getFullYear()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center md:justify-end pt-6 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="submit"
            className="w-full md:w-auto rounded-full px-12 h-14 gap-3 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95 text-lg font-black group overflow-hidden relative"
            disabled={updating}
          >
            {updating ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Save className="h-6 w-6 transition-transform group-hover:scale-110" />
            )}
            <span className="relative z-10">Save Profile</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
