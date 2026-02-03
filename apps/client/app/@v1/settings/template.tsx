import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}

export default function MoreTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
