'use client';

import { Label } from '../components/label';

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export const Field = ({ label, children }: FieldProps) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
};
