import { Metadata } from 'next';
import { AssetsView } from './components/AssetsView';

export const metadata: Metadata = {
  title: 'Assets Library',
  description: 'Manage your uploaded media'
};

export default function AssetsPage() {
  return <AssetsView />;
}
