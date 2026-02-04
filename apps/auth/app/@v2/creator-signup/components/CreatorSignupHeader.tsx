interface CreatorSignupHeaderProps {
  step: 1 | 2;
}

export const CreatorSignupHeader = ({ step }: CreatorSignupHeaderProps) => {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div className="space-y-1">
        <h3 className="text-2xl font-black text-white tracking-tight">BECOME A CREATOR</h3>
        <div className="flex gap-1.5">
          {[1, 2].map((i) => (
            <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-500' : 'bg-zinc-800'}`} />
          ))}
        </div>
      </div>
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded">Step {step} / 2</div>
    </div>
  );
};
