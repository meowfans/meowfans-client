import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface StudioTemplateProps {
  children: React.ReactNode;
}

export default function StudioTemplate({ children }: StudioTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
