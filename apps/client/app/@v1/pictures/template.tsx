import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface PicturesTemplateProps {
  children: React.ReactNode;
}

export default function PicturesTemplate({ children }: PicturesTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
