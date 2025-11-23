import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default async function ChannelThreadLayout({ children }: Props) {
  return <>{children}</>;
}
