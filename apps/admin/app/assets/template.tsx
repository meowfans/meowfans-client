import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

interface AssetsTemplateProps {
 children: React.ReactNode;
}

export default function AssetsTemplate({ children }: AssetsTemplateProps) {
 return <TemplateManager>{children}</TemplateManager>;
}
