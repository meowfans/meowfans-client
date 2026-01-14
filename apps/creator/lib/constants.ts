import {
  ChartLine,
  CircleDollarSign,
  CircleUserRound,
  CreditCard,
  GalleryVerticalEnd,
  Inbox,
  Mails,
  Settings,
  Sparkles
} from 'lucide-react';

export const authenticatedPaths = [
  '/studio',
  '/notifications',
  '/assets',
  '/channels',
  '/analytics',
  '/subscriptions',
  '/cards',
  '/more',
  '/vaults'
];

export enum ProfileCharts {
  NEW_CUSTOMERS = 'NEW_CUSTOMERS',
  TOTAL_REVENUE = 'TOTAL_REVENUE',
  GROWTH_RATE = 'GROWTH_RATE',
  PERFORMANCES = 'PERFORMANCES'
}

export const appBottomNavButtonOptions = [
  { icon: Sparkles, title: 'Notifications', path: '/notifications' },
  { icon: Sparkles, title: 'Studio', path: '/studio' },
  { icon: Mails, title: 'Channels', path: '/channels' },
  { icon: ChartLine, title: 'Analytics', path: '/analytics' },
  { icon: GalleryVerticalEnd, title: 'Assets', path: '/assets' },
  { icon: CircleDollarSign, title: 'Subscriptions', path: '/subscriptions' },
  { icon: CircleUserRound, title: 'My profile', path: '/profile' }
];

export const appSideBarButtonOptions = [
  { icon: Sparkles, title: 'Post Studio', path: '/studio' },
  { icon: Inbox, title: 'Notifications', path: '/notifications' },
  { icon: Mails, title: 'Messages', path: '/channels' },
  { icon: GalleryVerticalEnd, title: 'Assets', path: '/assets' },
  { icon: CircleDollarSign, title: 'Subscriptions', path: '/subscriptions' },
  { icon: CreditCard, title: ' Add card', path: '/cards' },
  { icon: CircleUserRound, url: '', title: 'My profile', path: '/profile' },
  { icon: Settings, title: 'More', path: '/more' },
  { icon: ChartLine, title: 'Analytics', path: '/analytics' }
];

export interface NewCustomerType {
  chartData: {
    month: string;
    desktop: number;
    mobile: number;
  }[];
  type: ProfileCharts.NEW_CUSTOMERS;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
}

export interface TotalRevenueType {
  type: ProfileCharts.TOTAL_REVENUE;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    month: string;
    revenue: number;
  }[];
}

export interface GrowthRateType {
  type: ProfileCharts.GROWTH_RATE;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    month: string;
    rate: number;
  }[];
}

export interface PerformanceType {
  type: ProfileCharts.PERFORMANCES;
  title: string;
  description: string;
  XDataKey: string;
  YDataKey: string;
  chartData: {
    metric: string;
    value: number;
  }[];
}

export const newCustomersData: NewCustomerType = {
  chartData: [
    { month: 'January', desktop: 120, mobile: 80 },
    { month: 'February', desktop: 160, mobile: 95 },
    { month: 'March', desktop: 190, mobile: 130 },
    { month: 'April', desktop: 220, mobile: 150 },
    { month: 'May', desktop: 260, mobile: 170 },
    { month: 'June', desktop: 300, mobile: 200 }
  ],
  description: 'Acquisition needs attention',
  title: 'New Customers',
  XDataKey: 'month',
  type: ProfileCharts.NEW_CUSTOMERS,
  YDataKey: 'desktop'
};

export const totalRevenueData: TotalRevenueType = {
  chartData: [
    { month: 'January', revenue: 12.5 },
    { month: 'February', revenue: 15.3 },
    { month: 'March', revenue: 18.7 },
    { month: 'April', revenue: 22.1 },
    { month: 'May', revenue: 25.9 },
    { month: 'June', revenue: 29.4 }
  ],
  title: 'Total revenue',
  description: 'Visitors for the last 6 months',
  type: ProfileCharts.TOTAL_REVENUE,
  XDataKey: 'month',
  YDataKey: 'revenue'
};

export const growthRateData: GrowthRateType = {
  chartData: [
    { month: 'January', rate: 5.2 },
    { month: 'February', rate: 6.8 },
    { month: 'March', rate: 7.5 },
    { month: 'April', rate: 8.9 },
    { month: 'May', rate: 9.4 },
    { month: 'June', rate: 10.1 }
  ],
  description: 'Meets growth projections',
  title: 'Growth rate',
  type: ProfileCharts.GROWTH_RATE,
  XDataKey: 'month',
  YDataKey: 'rate'
};
export const performancesData: PerformanceType = {
  chartData: [
    { metric: 'Response Time', value: 85 },
    { metric: 'Customer Satisfaction', value: 92 },
    { metric: 'Retention Rate', value: 78 },
    { metric: 'Conversion Rate', value: 65 }
  ],
  description: 'Meets growth projections',
  title: 'Growth rate',
  type: ProfileCharts.PERFORMANCES,
  XDataKey: 'metric',
  YDataKey: 'value'
};
