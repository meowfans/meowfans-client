'use client';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const Tab = ({ label, active, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition
        ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70'}
      `}
    >
      {label}
    </button>
  );
};
