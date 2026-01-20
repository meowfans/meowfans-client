import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface AlbumTemplateProps {
  children: React.ReactNode;
}

export default function AlbumTemplate({ children }: AlbumTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
