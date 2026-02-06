import { TemplateManager } from "@workspace/ui/globals/TemplateManager";

interface ApprovalsTemplateProps {
  children: React.ReactNode;
}

export default function ApprovalsTemplate({ children }: ApprovalsTemplateProps) {
  return <TemplateManager>{children}</TemplateManager>;
}
