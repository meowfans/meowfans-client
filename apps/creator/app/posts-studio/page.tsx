import { Metadata } from 'next';
import { PostsStudioView } from './components/PostsStudioView';

export const metadata: Metadata = {
  title: 'Posts Studio',
  description: 'Create and share your content'
};

export default function PostsStudioPage() {
  return <PostsStudioView />;
}
