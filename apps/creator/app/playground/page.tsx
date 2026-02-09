import type { Metadata } from 'next';
import { PlaygroundView } from './components/PlaygroundView';

export const metadata: Metadata = {
  title: 'Creator Playground | Games',
  description: 'Relax and play games in the Creator Playground'
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
