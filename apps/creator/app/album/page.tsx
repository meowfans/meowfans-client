import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Album',
  description: 'Your photo and video albums'
};

export default function AlbumPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h1 className="text-2xl font-bold">Album</h1>
      <p className="text-muted-foreground">Organize your content into albums. Coming Soon.</p>
    </div>
  );
}
