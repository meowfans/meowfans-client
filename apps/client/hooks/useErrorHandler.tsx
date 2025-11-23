'use client';

import { CombinedGraphQLErrors } from '@apollo/client';
import { toast } from 'sonner';

interface ErrorHandlerProps {
  error?: any;
  msg?: string;
  showError?: boolean;
}
export const useErrorHandler = () => {
  const errorHandler = ({ showError = true, error, msg }: ErrorHandlerProps) => {
    let message = '';
    if (error.name === 'AbortError') return;
    if (error instanceof CombinedGraphQLErrors) {
      message = error.message;
    } else message = 'Something wrong happened!';

    message = msg || message;

    if (showError) {
      toast.error(message, {
        closeButton: true,
        richColors: true,
        position: 'top-center',
        description: 'Oops!'
      });
    }
    console.log(error);
    console.log(error.message);
    return message;
  };

  return { errorHandler };
};
