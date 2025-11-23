import { CreatorAssets } from './components/CreatorAssets';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function CreatorAssetsPage({ params }: Props) {
  return <CreatorAssets username={(await params).username} />;
}
