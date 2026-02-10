export const PicturesHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-5xl font-black tracking-tighter bg-gradient-to-br from-foreground to-foreground/40 bg-clip-text text-transparent italic uppercase truncate">
          Gallery....
        </h1>
        <p className="text-[10px] md:text-sm font-medium text-muted-foreground/60 uppercase tracking-widest truncate">
          Discover captures from top creators
        </p>
      </div>
    </div>
  );
};
