import { motion } from 'framer-motion';

export const FeedbackHeader = () => {
  return (
    <div className="text-center space-y-2">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl ">
        We Value Your Feedback
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground font-medium">
        Help us improve your experience by sharing your thoughts.
      </motion.p>
    </div>
  );
};
