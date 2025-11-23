import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}

export default function TrendingTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
