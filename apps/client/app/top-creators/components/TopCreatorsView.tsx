'use client';

export function TopCreatorsView() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-muted-foreground">Top Creators Coming Soon</h1>
        </div>
      </div>
    </div>
  );
}
