'use client';

import { notFound, usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  const validPaths = ['/login', '/signup', '/creator-signup', '/forgot-password'];
  const pathname = usePathname();

  if (!validPaths.includes(pathname)) notFound();
  return <>{children}</>;
};

export default AuthPageLayout;
