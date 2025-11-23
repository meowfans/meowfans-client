'use client';
import React, { createContext, useContext, useState } from 'react';

type ShortsContextValue = {
  muted: boolean;
  volume: number;
  isPlaying: boolean;

  setMuted: (v: boolean) => void;
  setVolume: (v: number) => void;
  setIsPlaying: (v: boolean) => void;
};

const ShortsContext = createContext<ShortsContextValue | null>(null);

export const ShortsProvider = ({ children }: { children: React.ReactNode }) => {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ShortsContext.Provider value={{ muted, volume, isPlaying, setMuted, setVolume, setIsPlaying }}>{children}</ShortsContext.Provider>
  );
};

export const useShortsGlobal = () => {
  const context = useContext(ShortsContext);
  if (!context) {
    console.log('useShortsGlobal must be used within a ShortsProvider');
  }
  const { muted, volume, isPlaying, setMuted, setVolume, setIsPlaying } = context!;
  return { muted, volume, isPlaying, setMuted, setVolume, setIsPlaying };
};
