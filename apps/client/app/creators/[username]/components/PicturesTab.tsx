'use client';

interface PicturesTabProps {
  username: string;
}

export function PicturesTab({ username }: PicturesTabProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
      <p className="text-muted-foreground">Pictures will be displayed here</p>
    </div>
  );
}
