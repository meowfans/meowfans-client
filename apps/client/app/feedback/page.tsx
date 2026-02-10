import { ROUTE_METADATA } from '@/lib/metadata-config';
import { Metadata } from 'next';
import { Feedback } from './components/Feedback';

export const metadata: Metadata = {
  ...ROUTE_METADATA.feedback
};

export default function FeedbackPage() {
  return <Feedback />;
}
