import { SinglePost } from './components/Post';

export const metadata = {
  title: 'Post Details'
};

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SinglePost id={id} />;
}
