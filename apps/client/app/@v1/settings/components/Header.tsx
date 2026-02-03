import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

export const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-lg">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">More</h1>
            <p className="text-sm text-muted-foreground">Customize your experience and explore featured tools.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
