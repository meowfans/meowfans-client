'use client';
import { ExtendedUsersContextWrapper } from '@/hooks/context/ExtendedUsersContext';

interface Props {
  children: React.ReactNode;
}

export default function VaultsLayout({ children }: Props) {
  return <ExtendedUsersContextWrapper>{children}</ExtendedUsersContextWrapper>;
}
