'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Textarea } from '@workspace/ui/components/textarea';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { motion } from 'framer-motion';
import { Check, Globe, Loader2, User } from 'lucide-react';
import { useState } from 'react';

export const Account = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [language, setLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <GenericCard
      icon={User}
      title="Account Settings"
      headerClassName="space-y-1"
      contentClassName="grid gap-6 md:grid-cols-2"
      iconClassName="h-4 w-4 text-blue-600 dark:text-blue-400"
      description="Manage your account information and preferences"
      className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
      footerClassName="flex items-center justify-between border-t border-border/50 bg-muted/30 pt-6"
      footer={
        <>
          <p className="text-xs text-muted-foreground">Changes are saved automatically</p>
          <div className="flex items-center gap-3">
            <Button variant="ghost" disabled={isSaving} className="hover:bg-background">
              Discard
            </Button>
            <Button
              disabled={isSaving || isSaved}
              className="min-w-30 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isSaved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved!
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </>
      }
    >
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          Username
        </Label>
        <Input
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
        />
        <p className="text-xs text-muted-foreground">This is your public display name</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          Language
        </Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id="language" className="w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇬🇧 English</SelectItem>
            <SelectItem value="es">🇪🇸 Español</SelectItem>
            <SelectItem value="fr">🇫🇷 Français</SelectItem>
            <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
            <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
            <SelectItem value="ja">🇯🇵 日本語</SelectItem>
            <SelectItem value="zh">🇨🇳 中文</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Choose your preferred language</p>
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Bio
        </Label>
        <Textarea
          id="bio"
          className="min-h-30 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Tell us a little bit about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Your bio will be displayed on your profile</p>
          <p className="text-xs text-muted-foreground">{bio.length}/500</p>
        </div>
      </div>
    </GenericCard>
  );
};
