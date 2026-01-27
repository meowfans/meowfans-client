'use client';

import { Label } from '../components/label';
import { Switch } from '../components/switch';
import { cn } from '../lib/utils';

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  visible?: boolean;
}

export const Toggle = ({ label, checked, onChange, className, visible = true }: ToggleProps) => {
  return visible ? (
    <div className={cn('flex items-center justify-between', className)}>
      {label && <Label>{label}</Label>}
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  ) : null;
};
