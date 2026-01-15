import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface FollowersTemplateProps {
  children: React.ReactNode;
}

export default function FollowersTemplate({ children }: FollowersTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
