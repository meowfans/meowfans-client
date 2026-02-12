import { CombinedGraphQLErrors } from '@apollo/client/errors';

interface ServerErrorOptions {
  error: unknown;
  context?: string; // optional label like "GetPublicVaults"
}

export function serverErrorHandler({ error, context }: ServerErrorOptions): string {
  let message = 'Something went wrong';

  if (!error) {
    console.error(`[${context ?? 'Server'}] Unknown error`);
    return message;
  }

  // Apollo GraphQL execution errors
  if (error instanceof CombinedGraphQLErrors) {
    message = error.message;
  }

  // Standard Error object
  else if (error instanceof Error) {
    message = error.message;
  }

  // GraphQL errors array format
  else if (typeof error === 'object' && error !== null && 'errors' in error && Array.isArray((error as any).errors)) {
    const gqlErrors = (error as any).errors;
    message = gqlErrors[0]?.message ?? message;
  }

  console.error(`\n========== SERVER ERROR ==========`);

  if (context) {
    console.error(`Context: ${context}`);
  }

  console.error(`Message: ${message}`);
  console.error(`Full Error:`, error);
  console.error(`==================================\n`);

  return message;
}
