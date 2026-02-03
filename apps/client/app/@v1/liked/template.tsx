import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}
export default function LikedTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
