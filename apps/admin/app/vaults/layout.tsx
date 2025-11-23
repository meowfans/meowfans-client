'use client';
import { EventsProvider } from '@/hooks/api/EventsContextWrapper';
import { ExtendedUsersContextWrapper } from '@/hooks/context/ExtendedUsersContext';

interface Props {
  children: React.ReactNode;
}

export default function VaultsLayout({ children }: Props) {
  return (
    <ExtendedUsersContextWrapper>
      {children}
      <EventsProvider />
    </ExtendedUsersContextWrapper>
  );
}
