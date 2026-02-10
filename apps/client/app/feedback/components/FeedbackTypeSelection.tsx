import { Label } from '@workspace/ui/components/label';
import { feedbackCategories } from '@workspace/ui/lib/constants';
import { FeedbackFormData } from '@workspace/ui/lib/types';
import { cn } from '@workspace/ui/lib/utils';

interface FeedbackTypeSelectionProps {
  formData: FeedbackFormData;
  setFormData: (formData: FeedbackFormData) => void;
}

export const FeedbackTypeSelection = ({ formData, setFormData }: FeedbackTypeSelectionProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-bold uppercase tracking-wide text-muted-foreground/70">Feedback Categories</Label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {feedbackCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFormData({ ...formData, type: cat.id })}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 hover:bg-secondary/20',
              formData.type === cat.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-transparent bg-secondary/20'
            )}
          >
            <cat.icon className={cn('h-6 w-6', cat.color)} />
            <span className={cn('text-xs font-bold text-center', formData.type === cat.id ? 'text-foreground' : 'text-muted-foreground')}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
