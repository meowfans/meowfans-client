import { PageManager } from '@workspace/ui/globals/PageManager';
import { MessageContainer } from './Container';
import { MessageHeader } from './Header';
import { MessageInput } from './Input';
export interface MessagesEntity {
  id: number;
  channelId: string;
  author: string;
  url: string;
  content: string;
  timestamp: string;
}
const messages = [
  {
    id: 1,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Alice',
    content:
      'Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reloadFast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload',
    timestamp: '2025-08-29T12:30:00Z'
  },
  {
    id: 2,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 3,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 4,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  },
  {
    id: 5,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Alice',
    content: 'Hey everyone 👋 how’s it going?',
    timestamp: '2025-08-29T12:30:00Z'
  },
  {
    id: 6,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 7,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 8,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  },
  {
    id: 9,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 10,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 11,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  },
  {
    id: 12,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Alice',
    content: 'Hey everyone 👋 how’s it going?',
    timestamp: '2025-08-29T12:30:00Z'
  },
  {
    id: 13,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 14,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 15,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  },
  {
    id: 16,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Alice',
    content: 'Hey everyone 👋 how’s it going?',
    timestamp: '2025-08-29T12:30:00Z'
  },
  {
    id: 17,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 18,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 19,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  },
  {
    id: 20,
    url: '/icons/app_icon.svg',
    channelId: 'general',
    author: 'Bob',
    content: 'Doing great, just finished my project 🚀',
    timestamp: '2025-08-29T12:31:15Z'
  },
  {
    id: 21,
    url: '/icons/app_icon.svg',
    channelId: 'random',
    author: 'Charlie',
    content: 'Anyone up for a quick game tonight?',
    timestamp: '2025-08-29T13:05:00Z'
  },
  {
    id: 22,
    url: '/icons/app_icon.svg',
    channelId: 'dev-talk',
    author: 'Dana',
    content: 'Reminder: Deploy freeze starts tomorrow 🔒',
    timestamp: '2025-08-29T14:20:00Z'
  }
];
export const Message = () => {
  return (
    <PageManager>
      <MessageHeader />
      <MessageContainer messages={messages} />
      <MessageInput />
    </PageManager>
  );
};
