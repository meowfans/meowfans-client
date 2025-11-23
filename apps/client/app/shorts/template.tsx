import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface ShortsTemplateProps {
  children: React.ReactNode;
}

export default function ShortsTemplate({ children }: ShortsTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
