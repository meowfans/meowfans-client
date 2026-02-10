import { Label } from '@workspace/ui/components/label';
import { FeedbackType } from '@workspace/ui/lib/enums';
import { FeedbackFormData } from '@workspace/ui/lib/types';
import { cn } from '@workspace/ui/lib/utils';
import { Star } from 'lucide-react';

interface FeedbackGeneralComplimentProps {
  formData: FeedbackFormData;
  setFormData: (formData: FeedbackFormData) => void;
}

export const FeedbackGeneralCompliment = ({ formData, setFormData }: FeedbackGeneralComplimentProps) => {
  return (
    [FeedbackType.General, FeedbackType.Compliment].includes(formData.type) && (
      <div className="space-y-4">
        <Label className="text-base font-bold uppercase tracking-wide text-muted-foreground/70">How would you rate us?</Label>
        <div className="flex justify-center gap-2 p-4 bg-secondary/20 rounded-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star.toString() })}
              className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors',
                  parseInt(formData.rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    )
  );
};
