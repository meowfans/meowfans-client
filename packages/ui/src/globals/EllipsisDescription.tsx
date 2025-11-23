'use client';

interface EllipsisProps {
  expanded: boolean;
  description?: string | null;
  onExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  lineClamp?: number;
  className?: string;
}

export const EllipsisDescription: React.FC<EllipsisProps> = ({
  expanded,
  onExpanded,
  description = 'Default site description',
  lineClamp = 3,
  className
}) => {
  return (
    <h1
      className={`text-xs md:text-xl text-ellipsis ${className} ${expanded ? 'line-clamp-none' : `line-clamp-${lineClamp}`}`}
      onClick={() => onExpanded?.((prev) => !prev)}
    >
      {description}
    </h1>
  );
};
