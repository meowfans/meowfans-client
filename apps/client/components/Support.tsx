'use client';

import { AuthAwareButton } from './AuthAwareButton';

export const Support = () => {
  return <AuthAwareButton className='w-full' onClick={() => window.open('mailto:support@meowfans.app')}>Support</AuthAwareButton>;
};
