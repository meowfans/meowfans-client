import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Pictures } from './components/Pictures';

export const metadata: Metadata = {
  ...ROUTE_METADATA.pictures
};

export default function PicturesPage() {
  return <Pictures />;
}
