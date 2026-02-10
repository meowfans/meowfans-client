import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Posts } from './components/Posts';

export const metadata: Metadata = {
  ...ROUTE_METADATA.posts
};

export default function PostsPage() {
  return <Posts />;
}
