import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface Props {
  children: React.ReactNode;
}

export default function PostsTemplate({ children }: Props) {
  return <TemplateManager>{children}</TemplateManager>;
}
