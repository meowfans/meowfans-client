import { motion } from 'framer-motion';

export const ProfileHeader = () => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
        Profile Settings
      </h1>
      <p className="text-sm md:text-base font-medium text-muted-foreground/80">
        Personalize your account and how others see you on MeowFans.
      </p>
    </motion.div>
  );
};
