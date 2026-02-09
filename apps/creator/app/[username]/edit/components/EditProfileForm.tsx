'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { Textarea } from '@workspace/ui/components/textarea';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { useState } from 'react';

export function EditProfileForm() {
  const { creator } = useCreator();
  const { updateCreator, loading } = useCreatorMutations();
  const [formData, setFormData] = useState({
    bio: creator?.bio || '',
    themeColor: creator?.themeColor || '#000000',
    allowsComment: creator?.allowsComment ?? true,
    allowsMessaging: creator?.allowsMessaging ?? true,
    displayOnlineStatus: creator?.displayOnlineStatus ?? true,
    displayTotalPost: creator?.displayTotalPost ?? true,
    displayTotalSubscriber: creator?.displayTotalSubscriber ?? true
  });

  if (!creator) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreator(formData);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your public profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell your fans about yourself..."
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">Write a compelling bio to attract more followers</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="themeColor">Theme Color</Label>
            <div className="flex gap-3 items-center">
              <Input
                id="themeColor"
                name="themeColor"
                type="color"
                value={formData.themeColor}
                onChange={handleChange}
                className="h-12 w-20 cursor-pointer"
              />
              <Input
                type="text"
                value={formData.themeColor}
                onChange={(e) => setFormData((prev) => ({ ...prev, themeColor: e.target.value }))}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">Choose a color that represents your brand</p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Interaction</CardTitle>
          <CardDescription>Control how fans can interact with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowsComment">Allow Comments</Label>
              <p className="text-sm text-muted-foreground">Let fans comment on your posts</p>
            </div>
            <Switch
              id="allowsComment"
              checked={formData.allowsComment}
              onCheckedChange={(checked) => handleSwitchChange('allowsComment', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowsMessaging">Allow Messaging</Label>
              <p className="text-sm text-muted-foreground">Enable direct messages from fans</p>
            </div>
            <Switch
              id="allowsMessaging"
              checked={formData.allowsMessaging}
              onCheckedChange={(checked) => handleSwitchChange('allowsMessaging', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Display</CardTitle>
          <CardDescription>Choose what information to show on your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="displayOnlineStatus">Show Online Status</Label>
              <p className="text-sm text-muted-foreground">Display when you&apos;re online</p>
            </div>
            <Switch
              id="displayOnlineStatus"
              checked={formData.displayOnlineStatus}
              onCheckedChange={(checked) => handleSwitchChange('displayOnlineStatus', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="displayTotalPost">Show Total Posts</Label>
              <p className="text-sm text-muted-foreground">Display your post count publicly</p>
            </div>
            <Switch
              id="displayTotalPost"
              checked={formData.displayTotalPost}
              onCheckedChange={(checked) => handleSwitchChange('displayTotalPost', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="displayTotalSubscriber">Show Subscriber Count</Label>
              <p className="text-sm text-muted-foreground">Display your subscriber count publicly</p>
            </div>
            <Switch
              id="displayTotalSubscriber"
              checked={formData.displayTotalSubscriber}
              onCheckedChange={(checked) => handleSwitchChange('displayTotalSubscriber', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <LoadingButtonV2 type="submit" loading={loading} onClick={handleSubmit} size="lg">
          Save All Changes
        </LoadingButtonV2>
      </div>
    </div>
  );
}
