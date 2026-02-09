'use client';

import { motion } from 'framer-motion';
import { Fingerprint, Lock, ShieldCheck, User } from 'lucide-react';
import { useMemo } from 'react';
import { Logo } from './Logo';

export const Loading = () => {
  const satelliteIcons = useMemo(
    () => [
      { Icon: Lock, delay: 0, x: 80, y: -40, size: 24, color: '#FF3131' }, // Red - Security
      { Icon: Fingerprint, delay: 2, x: -70, y: 60, size: 28, color: '#FF914D' }, // Orange - Biometric/Unique
      { Icon: ShieldCheck, delay: 4, x: 80, y: 50, size: 20, color: '#FF3131' }, // Red - Verified
      { Icon: User, delay: 6, x: -60, y: -70, size: 24, color: '#FF914D' } // Orange - User/Creator
    ],
    []
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-2xl overflow-hidden perspective-[1000px]">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background Ambient Blobs */}
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className="absolute left-[30%] top-[20%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,49,49,0.5) 0%, rgba(255,49,49,0) 70%)'
            }}
          />
          <motion.div
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className="absolute right-[30%] bottom-[20%] h-[300px] w-[300px] rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,145,77,0.5) 0%, rgba(255,145,77,0) 70%)'
            }}
          />
        </motion.div>
      </div>

      {/* Central Interactive Element */}
      <div className="relative z-10 flex flex-col items-center justify-center scale-75 sm:scale-100">
        {/* Central Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: 'spring', damping: 15 }}
          className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/20"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />

          {/* Pulsing Glow behind logo */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl"
          />

          <Logo className="h-14 w-14 z-10 drop-shadow-[0_0_15px_rgba(255,49,49,0.5)]" />
        </motion.div>

        {/* Orbiting Auth Symbols */}
        {satelliteIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: item.delay / 4,
              ease: 'linear'
            }}
            style={{
              width: 250, // Orbit diameter
              height: 250
            }}
          >
            {/* Icon stays upright while orbiting */}
            <motion.div
              className="absolute flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/60 backdrop-blur-md border border-white/10 shadow-lg"
              style={{
                top: '0%',
                left: '50%',
                marginLeft: -20, // Half width center
                marginTop: -20 // Half height center
              }}
              animate={{ rotate: [0, -360] }} // Counter-rotate to stay upright
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: item.delay / 4 }}
            >
              <item.Icon size={item.size} color={item.color} />
            </motion.div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-12 flex flex-col items-center space-y-1"
        >
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 animate-pulse">Loading Content...</p>
        </motion.div>
      </div>
    </div>
  );
};
