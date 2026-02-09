'use client';

import { EditProfileForm } from './EditProfileForm';
import { ProfileImages } from './ProfileImages';

export function ProfileEditView() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Edit Profile</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EditProfileForm />
        </div>
        <div className="lg:col-span-1">
          <ProfileImages />
        </div>
      </div>
    </div>
  );
}
