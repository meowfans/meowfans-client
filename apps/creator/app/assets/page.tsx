import { Metadata } from 'next';
import { Assets } from './components/Assets';

export const metadata: Metadata = {
  title: 'Assets Library',
  description: 'Manage your uploaded media'
};

export default function AssetsPage() {
  return <Assets />;
}
