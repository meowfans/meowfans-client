'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import React, { useEffect, useState } from 'react';
import { ProfileBannerAndAvatarSection } from './ProfileBannerAndAvatarSection';
import { ProfileFooter } from './ProfileFooter';
import { ProfileFormFieldAvatar } from './ProfileFormFieldAvatar';
import { ProfileFormFieldText } from './ProfileFormFieldText';
import { ProfileHeader } from './ProfileHeader';
import { ProfilePrivileges } from './ProfilePrivileges';
import { NoProfile } from './NoProfile';
import { useFanProfile } from '@/hooks/client/useFanProfile';

export function Profile() {
  const { fan } = useFan();
  const [username, setUsername] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const { updateProfile, loading: updating } = useFanProfile();
  const [disabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(username.trim() === fan?.user.username && avatarUrl === fan?.user.avatarUrl && bannerUrl === fan?.user.bannerUrl);
  }, [username, avatarUrl, bannerUrl, fan]);

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

  if (!fan) return <NoProfile />;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-screen">
      <ProfileHeader />

      <form onSubmit={handleUpdate} className="space-y-8">
        <ProfileBannerAndAvatarSection
          username={username}
          avatarUrl={avatarUrl}
          bannerUrl={bannerUrl}
          fullName={fan.user.firstName + ' ' + fan.user.lastName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileFormFieldText username={username} setUsername={setUsername} />
          <ProfileFormFieldAvatar avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
        </div>

        <ProfilePrivileges />
        <ProfileFooter disabled={disabled} updating={updating} />
      </form>
    </div>
  );
}
