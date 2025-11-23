import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

export default function PostsTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateManager>{children}</TemplateManager>;
}
