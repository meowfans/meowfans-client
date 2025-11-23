import { configService } from './config';

export const buildSafeUrl = (input: { host: string; pathname?: string }) => {
  try {
    const redirectUrl = new URL(input.host);
    redirectUrl.pathname = input.pathname || '/';
    return redirectUrl.toString();
  } catch {
    console.log('Failed to create url!');
    return configService.NEXT_PUBLIC_AUTH_URL;
  }
};
