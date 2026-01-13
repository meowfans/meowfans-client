import { toast } from 'sonner';
import { triggerSparkles } from '../lib';

interface SuccessHandlerProps {
  message: string;
  description?: string;
  isEnabledConfetti?: boolean;
}

export const useSuccessHandler = () => {
  const successHandler = ({ isEnabledConfetti, message, description }: SuccessHandlerProps) => {
    const _description = 'Happy to help!';
    if (isEnabledConfetti) {
      if (!description) toast.success(message, { description: _description, dismissible: true });
      triggerSparkles();
    } else {
      toast.success(message, { description, dismissible: true });
    }
  };

  return { successHandler };
};
