import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

export default function VaultsTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateManager>{children}</TemplateManager>;
}
