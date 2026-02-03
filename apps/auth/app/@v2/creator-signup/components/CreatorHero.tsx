'use client';

import { motion } from 'framer-motion';
import { DollarSign, Headphones, ShieldCheck } from 'lucide-react';
import { AppLogo } from '../../components/AppLogo';

export function CreatorHero() {
  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: '$45M+ Paid',
      desc: 'Transparent payouts every week.',
      color: 'text-orange-400'
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: '0% Fees*',
      desc: 'Introductory offer for new stars.',
      color: 'text-amber-400'
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: '24/7 VIP',
      desc: 'Dedicated manager for your growth.',
      color: 'text-yellow-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col gap-8 text-center md:text-left h-full justify-center order-2 lg:order-1"
    >
      <div className="flex items-center justify-center md:justify-start gap-4">
        <div className="flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
          <AppLogo variant="creator" size={60} className="w-14 h-14" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-orange-200 to-amber-100">
            MEOWFANS <span className="text-orange-500">STUDIO</span>
          </h1>
          <span className="text-[10px] tracking-[0.3em] font-bold text-orange-400 uppercase">Creator Empowerment Program</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
          Turn your <br />
          creative passion <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-400 to-yellow-400">into a career.</span>
        </h2>
        <p className="text-xl text-zinc-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
          Join the most creator-centric platform in the world. Keep more of what you earn and grow faster with our tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex flex-col gap-3 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-md group hover:bg-orange-500/10 transition-colors"
          >
            <div className={`${benefit.color} group-hover:scale-110 transition-transform`}>{benefit.icon}</div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-white">{benefit.title}</div>
              <div className="text-xs text-zinc-500 leading-tight">{benefit.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
