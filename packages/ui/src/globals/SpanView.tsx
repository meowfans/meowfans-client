'use client';

interface SpanViewProps {
  label: string;
  value: string | number;
  className?: string;
}

/**
 * Extended SpanView to handle span for key and value
 * @param label is for the key value
 * @param value is for the value
 * @param className is for the className of span
 */
export const SpanView = ({ label, value, className }: SpanViewProps) => {
  return (
    <span className={className}>
      {label}: {value}
    </span>
  );
};
