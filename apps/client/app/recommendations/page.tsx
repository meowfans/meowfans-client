import { Metadata } from 'next';
import { Recommendations } from './components/Recommendations';

export const metadata: Metadata = {
  title: 'Recommendations Test cases',
  description: 'Test page for recommendation algorithm'
};

export const dynamic = 'force-dynamic';

export default async function RecommendationsPage() {
  return <Recommendations />;
}
