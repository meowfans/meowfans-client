import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { ImageIcon, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';

interface DashboardStatsProps {
  followingLength: number;
  fanAssetsLength: number;
  channelsLength: number;
}

export const DashboardStats = ({ followingLength, fanAssetsLength, channelsLength }: DashboardStatsProps) => {
  const stats = [
    {
      label: 'Following',
      value: followingLength.toString(),
      icon: Users,
      color: 'text-blue-500',
      description: 'Creators you watch',
      href: '/following'
    },
    {
      label: 'Collection',
      value: fanAssetsLength.toString(),
      icon: ImageIcon,
      color: 'text-purple-500',
      description: 'Purchased content',
      href: '/purchased'
    },
    {
      label: 'Messages',
      value: channelsLength.toString(),
      icon: MessageSquare,
      color: 'text-green-500',
      description: 'Active conversations',
      href: '/channels'
    }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <Link href={stat.href}>
            <Card className="hover:bg-secondary/20 transition-colors border-none bg-secondary/10 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
