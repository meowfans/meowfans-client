import { Loading } from '@workspace/ui/globals/Loading';

interface LoadingComponentProps {
  loadingText: string;
}

export const LoadingComponent = ({ loadingText }: LoadingComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loading />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">{loadingText}</p>
    </div>
  );
};
