'use client';

import { configService } from '@/util/config';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our{' '}
      <Link href={buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL, pathname: '/terms' })}>Terms of Service</Link> and{' '}
      <Link href={buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL, pathname: '/privacy' })}>Privacy Policy</Link>.
    </div>
  );
};

export default Footer;
