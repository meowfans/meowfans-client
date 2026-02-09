import { PostDetailView } from "./components/PostDetailView";

export const metadata = {
  title: 'Post Details'
};

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetailView id={id} />;
}
