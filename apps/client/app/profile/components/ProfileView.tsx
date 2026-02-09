'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useAPI } from '@/hooks/useAPI';
import { useFanProfile } from '@/hooks/useFanProfile';
import { AssetType, UpdateUserProfileInput } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Loading } from '@workspace/ui/globals/Loading';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { MediaType } from '@workspace/ui/lib/enums';
import { motion } from 'framer-motion';
import { Camera, Check, Image as ImageIcon, Link as LinkIcon, Loader2, Save, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function ProfileView() {
  const { fan } = useFan();
  const { upload } = useAPI();
  const { errorHandler } = useErrorHandler();
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const { updateProfile, loading: updating } = useFanProfile();
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);
  const [uploadingBanner, setUploadingBanner] = useState<boolean>(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fan?.user) {
      setUsername(fan.user.username || '');
      setAvatarUrl(fan.user.avatarUrl || '');
      setBannerUrl(fan.user.bannerUrl || '');
    }
  }, [fan]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const input: UpdateUserProfileInput = {
      username,
      avatarUrl,
      bannerUrl
    };
    await updateProfile(input);
  };

  const handleImageUpload = async (file: File, type: 'avatar' | 'banner') => {
    const isAvatar = type === 'avatar';
    if (isAvatar) {
      setUploadingAvatar(true);
    } else {
      setUploadingBanner(true);
    }

    try {
      const formdata = new FormData();
      formdata.append('file', file);
      const res = await upload({
        mediaType: MediaType.PROFILE_MEDIA,
        assetType: AssetType.Private,
        formdata
      });
      if (res?.rawUrl) {
        if (isAvatar) {
          setAvatarUrl(res.rawUrl);
        } else {
          setBannerUrl(res.rawUrl);
        }
      }
    } catch (error) {
      errorHandler({ error, msg: `Failed to upload ${type}` });
    } finally {
      if (isAvatar) {
        setUploadingAvatar(false);
      } else {
        setUploadingBanner(false);
      }
    }
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

              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full gap-2 shadow-xl"
                  onClick={() => bannerInputRef.current?.click()}
                  disabled={uploadingBanner}
                >
                  {uploadingBanner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  {bannerUrl ? 'Change Banner' : 'Upload Banner'}
                </Button>
              </div>
              <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'banner')}
              />
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

                  <div
                    className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-[4px] opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-1 text-white">
                      {uploadingAvatar ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest">Update</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={avatarInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')}
                  />
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
            disabled={updating || uploadingAvatar || uploadingBanner}
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
