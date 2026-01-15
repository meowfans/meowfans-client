import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface EditTemplateProps {
  children: React.ReactNode;
}

export default function EditTemplate({ children }: EditTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
