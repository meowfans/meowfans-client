import { SearchTerm } from './components/SearchTerm';

interface Props {
  params: Promise<{ label: string }>;
}

export default async function SearchTermPage({ params }: Props) {
  const label = (await params).label;
  return <SearchTerm label={decodeURIComponent(label)} />;
}
