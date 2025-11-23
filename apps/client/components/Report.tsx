'use client';

import { AuthAwareButton } from './AuthAwareButton';

export const Report = () => {
  return <AuthAwareButton onClick={() => window.open('mailto:support@meowfans.app')} />;
};
