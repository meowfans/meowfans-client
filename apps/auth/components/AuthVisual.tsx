'use client';

import { AnimatedLogo } from '@workspace/ui/globals/AnimatedLogo';
import { AnimatePresence, motion } from 'framer-motion';
import { Fingerprint, Lock, ShieldCheck, Sparkles, User } from 'lucide-react';
import { useMemo } from 'react';

export function AuthVisual() {
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
    <div className="relative flex h-full w-full items-center justify-center rounded-[3rem] overflow-hidden bg-[#0a0a0a]">
      {/* Background Layer: Mesh Gradients & Particle Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute -left-[10%] -top-[10%] h-[120%] w-[120%] opacity-40 blur-[120px]"
          style={{
            background: 'radial-gradient(circle at center, #FF3131 0%, transparent 70%)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute -right-[10%] -bottom-[10%] h-[120%] w-[120%] opacity-40 blur-[120px]"
          style={{
            background: 'radial-gradient(circle at center, #FF914D 0%, transparent 70%)'
          }}
        />

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-transparent to-[#0a0a0a]/60" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center scale-75 md:scale-100">
        <div className="relative">
          {/* Main Logo Container with Glassmorphism */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, type: 'spring', bounce: 0.4 }}
            className="group relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all hover:border-white/20"
          >
            {/* Pulsing Outer Ring */}
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-[2.5rem] border border-primary/30"
            />

            {/* Inner Glow */}
            <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-xl opacity-50" />

            <AnimatedLogo className="h-20 w-20 z-10 drop-shadow-[0_0_20px_rgba(255,49,49,0.4)]" />
          </motion.div>

          {/* Satellite Symbols with dynamic orbits */}
          <AnimatePresence>
            {satelliteIcons.map((item, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 -ml-20 -mt-20"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 25 + index * 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  width: 160 + index * 40,
                  height: 160 + index * 40,
                  transformOrigin: 'center center'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-xl group/icon"
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{
                      duration: 25 + index * 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <item.Icon size={18} color={item.color} className="opacity-80 group-hover/icon:opacity-100 transition-opacity" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Text / Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 flex flex-col items-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Encryption Protocol v2.4</span>
          </div>

          <div className="flex items-center gap-6 opacity-20">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-white" />
            <Sparkles size={12} className="text-white" />
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
