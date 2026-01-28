'use client';

import { TemplateManager } from '@workspace/ui/globals/TemplateManager';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateManager>{children}</TemplateManager>;
}
