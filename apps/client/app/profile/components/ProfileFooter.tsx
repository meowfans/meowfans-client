import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

interface ProfileFooterProps {
  disabled: boolean;
  updating: boolean;
}

export const ProfileFooter = ({ disabled, updating }: ProfileFooterProps) => {
  return (
    <motion.div
      className="flex justify-center md:justify-end pt-6 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <LoadingButtonV2
        type="submit"
        className="w-full md:w-auto rounded-full px-12 h-14 gap-3 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95 text-lg font-black group overflow-hidden relative"
        disabled={disabled}
        loading={updating}
      >
        <Save className="h-6 w-6 transition-transform group-hover:scale-110" />
        Save Profile
      </LoadingButtonV2>
    </motion.div>
  );
};
