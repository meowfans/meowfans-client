import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { FeedbackFormData } from '@workspace/ui/lib/types';

interface FeedbackAdditionalInputsProps {
  formData: FeedbackFormData;
  setFormData: (formData: FeedbackFormData) => void;
}

export const FeedbackAdditionalInputs = ({ formData, setFormData }: FeedbackAdditionalInputsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="font-bold">
          Subject
        </Label>
        <Input
          id="title"
          placeholder="Brief summary..."
          className="h-12 bg-secondary/30 rounded-xl border-white/5 focus-visible:ring-primary/20"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-bold">
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more details..."
          className="min-h-[150px] bg-secondary/30 rounded-xl border-white/5 focus-visible:ring-primary/20 resize-none p-4"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
    </div>
  );
};
