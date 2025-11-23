import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}

export default function VaultsTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
