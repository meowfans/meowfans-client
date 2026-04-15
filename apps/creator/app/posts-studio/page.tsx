import { Metadata } from 'next';
import { PostsStudio } from './components/PostsStudio';

export const metadata: Metadata = {
  title: 'Posts Studio',
  description: 'Create and share your content'
};

export default function PostsStudioPage() {
  return <PostsStudio />;
}
