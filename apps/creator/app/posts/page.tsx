import { Metadata } from 'next';
import { PostsView } from './components/PostsView';

export const metadata: Metadata = {
  title: 'Posts Management',
  description: 'Manage, analyze, and optimize your content'
};

export default function PostsPage() {
  return <PostsView />;
}
