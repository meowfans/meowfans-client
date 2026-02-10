import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { TutorialsView } from './components/TutorialsView';

export const metadata: Metadata = {
  ...ROUTE_METADATA.tutorials
};

export default function TutorialsPage() {
  return <TutorialsView />;
}
