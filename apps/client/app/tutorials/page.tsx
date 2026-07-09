import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Tutorials } from './components/Tutorials';

export const metadata: Metadata = {
  ...ROUTE_METADATA.tutorials
};

export default function TutorialsPage() {
  return <Tutorials />;
}
