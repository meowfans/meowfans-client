import { Footer } from '@/components/Footer';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { NotificationThreads, NotificationType } from './Thread';

export interface Notifications {
  id: number;
  fullName: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}

export const Notifications = () => {
  const notifications = Array(10)
    .fill(0)
    .map<Notifications>((_, idx) => ({
      id: idx,
      fullName: idx % 2 === 0 ? 'Superman' : 'BatMan',
      title: idx % 2 === 0 ? 'Weekly Digest' : 'Security Alert',
      message: idx % 2 === 0 ? 'You gained 120 new followers this week 🎉' : 'You purchased a burger',
      type: (['info', 'success', 'warning', 'error'] as NotificationType[])[idx % 4],
      isRead: idx % 3 === 0 ? false : true,
      createdAt: new Date('2025-08-20T15:33:15.230Z')
    }));
  return (
    <PageManager>
      <NotificationThreads notifications={notifications} />
      <Footer />
    </PageManager>
  );
};
