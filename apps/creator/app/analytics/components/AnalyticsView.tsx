'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@workspace/ui/components/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Calendar, DollarSign, Eye, Heart, MessageSquare, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 2400, views: 4000 },
  { month: 'Feb', revenue: 1398, views: 3000 },
  { month: 'Mar', revenue: 9800, views: 2000 },
  { month: 'Apr', revenue: 3908, views: 2780 },
  { month: 'May', revenue: 4800, views: 1890 },
  { month: 'Jun', revenue: 3800, views: 2390 },
  { month: 'Jul', revenue: 4300, views: 3490 }
];

const topPosts = [
  { id: 1, title: 'Summer Vibes ☀️', views: '12.4k', engagement: '8.2%', revenue: '$1,200' },
  { id: 2, title: 'Morning Routine ☕', views: '8.1k', engagement: '12.5%', revenue: '$850' },
  { id: 3, title: 'New Tutorial: Lighting', views: '15.2k', engagement: '5.4%', revenue: '$2,100' },
  { id: 4, title: 'Behind the Scenes 🎬', views: '22.1k', engagement: '15.8%', revenue: '$3,400' }
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'oklch(var(--primary))'
  },
  views: {
    label: 'Views',
    color: 'oklch(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AnalyticsView() {
  return (
    <div className="flex-1 space-y-8 px-2 sm:px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl flex items-center gap-3">
            <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            Analytics
          </h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium">Monitor your performance and revenue growth</p>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <Select defaultValue="7d">
            <SelectTrigger className="w-full md:w-[180px] bg-card/40 backdrop-blur-xl border-primary/20 rounded-full h-11">
              <Calendar className="mr-2 h-4 w-4 opacity-50" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Total Revenue"
          value="$45,231"
          description="+20.1% from last month"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Subscribers"
          value="2,350"
          description="+180.1% from last month"
          icon={<Users className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard title="Profile Views" value="12.2k" description="+19% from last month" icon={<Eye className="h-4 w-4" />} trend="up" />
        <StatsCard
          title="Engagement"
          value="15.8%"
          description="-4% from last month"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4 bg-card/30 backdrop-blur-md border-primary/10 shadow-2xl relative overflow-hidden order-1 lg:order-1">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <DollarSign className="w-64 h-64 -mr-20 -mt-20" />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Revenue Streams</CardTitle>
            <CardDescription>Daily performance across all platforms</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:p-6 sm:pt-0">
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <AreaChart
                data={revenueData}
                margin={{
                  left: 12,
                  right: 12
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="60%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--muted-foreground))" opacity={0.05} />
                <XAxis dataKey="month" stroke="oklch(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis
                  stroke="oklch(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  dx={-10}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-card/30 backdrop-blur-md border-primary/10 shadow-2xl order-2 lg:order-2">
          <CardHeader>
            <CardTitle className="text-xl">Top Performing</CardTitle>
            <CardDescription>Your most engaging content this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center p-3 rounded-2xl hover:bg-primary/5 transition-colors cursor-default"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-black uppercase truncate">{post.title}</p>
                    <p className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">
                      {post.views} views • {post.engagement} engagement
                    </p>
                  </div>
                  <div className="ml-auto font-black italic text-sm text-primary">{post.revenue}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="overflow-x-auto pb-2 -mx-2 px-2 md:-mx-4 md:px-4 lg:mx-0 lg:px-0 scrollbar-hide">
          <TabsList className="bg-card/40 backdrop-blur-xl border border-primary/10 p-1 rounded-full h-12 inline-flex min-w-max md:min-w-0">
            <TabsTrigger
              value="overview"
              className="rounded-full px-6 md:px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="rounded-full px-6 md:px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm"
            >
              Engagement
            </TabsTrigger>
            <TabsTrigger
              value="audience"
              className="rounded-full px-6 md:px-8 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs md:text-sm"
            >
              Audience
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <QuickStat title="PPV Messages" value="128" change="+12.5%" icon={<MessageSquare className="h-4 w-4" />} />
            <QuickStat title="Avg. Tip" value="$18.90" change="+2.4%" icon={<Heart className="h-4 w-4" />} />
            <QuickStat title="Unlock Rate" value="4.2%" change="+0.4%" icon={<DollarSign className="h-4 w-4" />} />
            <QuickStat title="Fan Growth" value="+89" change="+5.2%" icon={<Users className="h-4 w-4" />} />
          </div>
        </TabsContent>
        <TabsContent value="engagement">
          <Card className="bg-card/30 backdrop-blur-md border border-dashed border-primary/20">
            <CardHeader>
              <CardTitle>Engagement Details</CardTitle>
              <CardDescription>Advanced metrics and interaction heatmaps</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground font-medium max-w-sm italic">
                Real-time interaction heatmaps and fan sentiment analysis are being processed. Check back soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
  icon,
  trend
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="bg-card/30 backdrop-blur-xl border-primary/10 hover:border-primary/40 transition-all group overflow-hidden relative p-1 shadow-xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all text-primary">
          {icon}
        </div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-[10px] tracking-[0.2em] text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl sm:text-4xl tracking-tighter mb-2">{value}</div>
          <div className="flex items-center">
            <div
              className={cn(
                'flex items-center px-2 py-0.5 rounded-full text-[10px] font-black italic',
                trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'
              )}
            >
              {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {description.split(' ')[0]}
            </div>
            <span className="text-[10px] text-muted-foreground ml-2 font-bold uppercase tracking-wider">
              {description.split(' ').slice(1).join(' ')}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickStat({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card className="bg-card/20 backdrop-blur-md border border-primary/5 hover:bg-card/30 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] tracking-wider text-muted-foreground">{title}</CardTitle>
        <div className="text-primary opacity-50">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{value}</div>
        <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">{change} vs. last 24h</p>
      </CardContent>
    </Card>
  );
}
