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
    let message = 'Something went wrong';

    if (!error) {
      message = msg || message;
    } else {
      if (error.name === 'AbortError') return;

      // Apollo GraphQL execution errors
      if (error instanceof CombinedGraphQLErrors) {
        message = error.message;
      }
      // Standard Error object or similar
      else if (error.message) {
        message = error.message;
      }
      // Handle the case where error might be a string
      else if (typeof error === 'string') {
        message = error;
      }

      // If message is the generic "Internal Server Error" or indicates a crash
      if (
        message.toLowerCase().includes('internal server error') ||
        message.toLowerCase().includes('unexpected token') || // Often means HTML error page was returned instead of JSON
        message.toLowerCase().includes('500')
      ) {
        message = 'Server is currently experiencing issues. Please try again later.';
      }

      message = msg || message;
    }

    if (showError) {
      toast.error(message, {
        closeButton: true,
        richColors: true,
        position: 'top-center',
        description: 'Oops!'
      });
    }

    console.error('ErrorHandler Caught:', error);
    return message;
  };

  return { errorHandler };
};
