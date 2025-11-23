import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface PurchasedTemplateProps {
  children: React.ReactNode;
}

export default function PurchasedTemplate({ children }: PurchasedTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
