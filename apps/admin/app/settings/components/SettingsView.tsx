'use client';

import { useAdmin } from '@/hooks/context/AdminContextWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { Bell, Globe, Lock, Palette, Save, Settings, Shield, User } from 'lucide-react';

export function SettingsView() {
  const { admin } = useAdmin();

  return (
    <div className="space-y-8 p-4 md:p-8 pt-6 max-w-6xl mx-auto flex flex-col h-full w-full min-w-0 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Configure your administrative preferences</p>
        </div>
        <Button className="rounded-full font-black italic uppercase tracking-widest text-xs gap-2 px-8 h-12 shadow-xl shadow-primary/20">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="bg-card/30 backdrop-blur-xl border-primary/10 overflow-hidden shadow-xl">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20 group-hover:border-primary/50 transition-all">
                  <AvatarImage src={admin?.user?.avatarUrl ?? MEOW_FANS_AVATAR} />
                  <AvatarFallback className="bg-primary/5 text-primary text-2xl font-black uppercase">
                    {admin?.user?.username?.slice(0, 2) || 'AD'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Palette className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="font-black uppercase text-xl italic tracking-tight italic">@{admin?.user?.username}</p>
              <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase mt-1">System Administrator</p>
            </div>
            <div className="border-t border-primary/5 p-4 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl font-bold uppercase text-[10px] tracking-widest gap-3 bg-primary/5 text-primary"
              >
                <User className="h-4 w-4" />
                Identity Details
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl font-bold uppercase text-[10px] tracking-widest gap-3">
                <Lock className="h-4 w-4" />
                Security & Access
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl font-bold uppercase text-[10px] tracking-widest gap-3">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Audit Configuration
            </h2>
            <Card className="bg-card/20 backdrop-blur-md border-primary/10">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs">Strict Review Protocol</Label>
                    <p className="text-xs text-muted-foreground">Always require manual approval for high-risk assets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t border-primary/5 pt-6">
                  <div className="space-y-0.5">
                    <Label className="text-xs">Administrative Alerts</Label>
                    <p className="text-xs text-muted-foreground">Receive real-time notifications for system events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Regional Settings
            </h2>
            <Card className="bg-card/20 backdrop-blur-md border-primary/10 text-xs font-black italic uppercase">
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-widest">System Language</Label>
                    <Input disabled defaultValue="English (US)" className="bg-primary/5 border-primary/10 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-widest">Timezone</Label>
                    <Input disabled defaultValue="UTC (Greenwich Meantime)" className="bg-primary/5 border-primary/10 rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
