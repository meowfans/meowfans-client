import { BookOpen, GraduationCap, Lightbulb, Search, Star } from 'lucide-react';

export const TUTORIALS = [
  {
    id: '1',
    slug: 'getting-started',
    title: 'Getting Started with MeowFans',
    description: 'Learn the basics of setting up your profile and discovering creators.',
    category: 'Basics',
    duration: '5 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    icon: GraduationCap
  },
  {
    id: '2',
    slug: 'subscriptions-and-unlocks',
    title: 'How to Subscribe & Unlock Content',
    description: 'A complete guide on managing subscriptions and purchasing individual vault items.',
    category: 'Payments',
    duration: '3 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop',
    icon: Star
  },
  {
    id: '3',
    slug: 'search-and-filters',
    title: 'Advanced Search & Filters',
    description: 'Master the discovery tools to find exactly the type of creators you love.',
    category: 'Discovery',
    duration: '4 min',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    icon: Search
  },
  {
    id: '4',
    slug: 'interacting-with-creators',
    title: 'Interacting with Creators',
    description: 'How to use messaging and commenting features effectively.',
    category: 'Social',
    duration: '6 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1516251193007-45ef944abb8c?q=80&w=1000&auto=format&fit=crop',
    icon: Lightbulb
  },
  {
    id: '5',
    slug: 'managing-privacy',
    title: 'Managing Your Privacy',
    description: 'Learn how to control your personal data and visibility settings.',
    category: 'Security',
    duration: '5 min',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    icon: BookOpen
  },
  {
    id: '6',
    slug: 'creator-payout-strategy',
    title: 'Creator Payout Strategy',
    description: 'Best practices for creators to maximize their earnings and engagement.',
    category: 'For Creators',
    duration: '10 min',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop',
    icon: Star
  }
];
