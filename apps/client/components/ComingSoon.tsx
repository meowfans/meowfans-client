'use client';

interface Props {
  children: React.ReactNode;
  label?: string;
}

const ComingSoonWrapper: React.FC<Props> = ({ children, label = 'COMING SOON' }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[1px] z-10" />

      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="rotate-[-25deg]">
          <span className="text-5xl md:text-7xl font-extrabold text-black/30 dark:text-white/30 tracking-[0.1em] select-none">{label}</span>
        </div>
      </div>

      <div className="opacity-70 pointer-events-none select-none">{children}</div>
    </div>
  );
};

export default ComingSoonWrapper;
