import { Film, Image as ImageIcon, Layers } from 'lucide-react';

interface AssetsStatsProps {
  totalAssets: number;
  imageCount: number;
  videoCount: number;
}

export function AssetsStats({ totalAssets, imageCount, videoCount }: AssetsStatsProps) {
  const stats = [
    { label: 'Total', value: totalAssets, icon: Layers, color: 'text-primary' },
    { label: 'Images', value: imageCount, icon: ImageIcon, color: 'text-blue-500' },
    { label: 'Videos', value: videoCount, icon: Film, color: 'text-red-500' },
  ];

  return (
    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-2 whitespace-nowrap group">
          <div className={`p-1.5 rounded-lg bg-muted/50 transition-colors group-hover:bg-muted`}>
            <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-tight">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium leading-tight">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
