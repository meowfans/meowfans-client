import { motion } from 'framer-motion';
import { CalendarDaysIcon } from 'lucide-react';

export const CardsHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-[var(--background)]">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-lg">
            <CalendarDaysIcon size={20} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Cards</h1>
            <p className="text-sm text-muted-foreground">Personalize your cards</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
