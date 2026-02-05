'use client';

import { motion } from 'framer-motion';
import { Camera, Users, Zap } from 'lucide-react';
import { AppLogo } from './AppLogo';

export function AuthHero() {
  const stats = [
    { icon: <Users className="w-4 h-4" />, label: '5k+ Creators', sublabel: 'Joined this week' },
    { icon: <Camera className="w-4 h-4" />, label: '800k+', sublabel: 'Exclusive Photos' },
    { icon: <Zap className="w-4 h-4" />, label: '99.9%', sublabel: 'Uptime' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col gap-4 lg:gap-8 text-center md:text-left h-full justify-center lg:pr-12"
    >
      <div className="flex items-center justify-center md:justify-start gap-3 lg:gap-4">
        <div className="flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
          <AppLogo size={60} className="w-10 h-10 lg:w-16 lg:h-16" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-white/60 leading-none">
            MEOWFANS
          </h1>
          <span className="text-[8px] lg:text-[10px] tracking-[0.3em] font-bold text-indigo-400 uppercase">Premium Content Ecosystem</span>
        </div>
      </div>

      <div className="space-y-2 lg:space-y-4">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
          Where passion <br />
          meets{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
            exclusivity.
          </span>
        </h2>
        <p className="text-sm lg:text-xl text-zinc-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
          The ultimate platform for creators to thrive and fans to connect deeper than ever before.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-6 pt-2 lg:pt-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm ${
              i === 2 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="text-indigo-400">{stat.icon}</div>
            <div>
              <div className="text-sm lg:text-lg font-bold text-white leading-none">{stat.label}</div>
              <div className="text-[10px] lg:text-xs text-zinc-500 mt-1">{stat.sublabel}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex -space-x-3 mt-2 lg:mt-4 justify-center md:justify-start">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full bg-linear-to-br from-zinc-700 to-zinc-900" />
          </div>
        ))}
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-[8px] lg:text-[10px] font-bold text-white">
          +2k
        </div>
      </div>
    </motion.div>
  );
}
