import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface SingleChannelProps {
  children: React.ReactNode;
}

export default function SingleChannel({ children }: SingleChannelProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
