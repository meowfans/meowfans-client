'use client';

import { Card } from '@workspace/ui/components/card';
import { Globe } from 'lucide-react';

interface SettingsLanguageProps {
  language: string;
  setLanguage: (lang: string) => void;
}

export function SettingsLanguage({ language, setLanguage }: SettingsLanguageProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h2 className="text-3xl font-black italic uppercase tracking-tight">Language & Locale</h2>
        <p className="text-muted-foreground font-medium">Set your regional preferences.</p>
      </header>

      <Card className="border-none bg-secondary/5 p-8 rounded-[2rem] ring-1 ring-white/5 space-y-6">
        <h4 className="font-black italic uppercase tracking-tight flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Display Language
        </h4>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full h-14 rounded-2xl bg-secondary/10 border-none px-6 font-bold text-sm appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:bg-secondary/20"
        >
          <option value="en-US">English (United States)</option>
          <option value="es-ES">Spanish (España)</option>
          <option value="fr-FR">French (France)</option>
          <option value="ja-JP">Japanese (日本)</option>
          <option value="de-DE">German (Deutschland)</option>
        </select>
        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-2">
          Changing language may require a restart of the application.
        </p>
      </Card>
    </div>
  );
}
