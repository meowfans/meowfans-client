import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}

export default function PageTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
