import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

export default function ProfileTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateManager>{children}</TemplateManager>;
}
