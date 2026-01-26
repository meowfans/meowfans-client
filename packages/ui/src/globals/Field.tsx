'use client';

import { Label } from '../components/label';

interface FieldProps {
  label: string;
  children?: React.ReactNode;
  onClick?: () => unknown;
}

export const Field = ({ label, children, onClick }: FieldProps) => {
  return (
    <div className="space-y-1" onClick={onClick}>
      <Label>{label}</Label>
      {children}
    </div>
  );
};
