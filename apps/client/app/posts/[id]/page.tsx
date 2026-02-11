import { getSinglePost } from '@/app/server/getSinglePost';
import { SinglePost } from './components/Post';

export const metadata = {
  title: 'Post Details'
};

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getSinglePost({ postId: id });
  return <SinglePost initialPost={post} />;
}
