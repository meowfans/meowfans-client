import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { TabsContent } from '@workspace/ui/components/tabs';
import { Textarea } from '@workspace/ui/components/textarea';
import { ArrowRight } from 'lucide-react';
import { CreatorApplicationTabProps, VerificationAnswers } from './CreatorApplicationForm';

interface CreatorApplicationDescriptionFormProps {
  formData: VerificationAnswers;
  setActiveTab: React.Dispatch<React.SetStateAction<CreatorApplicationTabProps>>;
  setFormData: React.Dispatch<React.SetStateAction<VerificationAnswers>>;
}

export const CreatorApplicationDescriptionForm = ({ formData, setFormData, setActiveTab }: CreatorApplicationDescriptionFormProps) => {
  return (
    <TabsContent value="questions" className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium ml-1">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Your Legal Name"
          value={formData.fullName}
          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          className="bg-muted/30 border-muted-foreground/20 focus:border-purple-500/50 transition-all h-10"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialMedia" className="text-sm font-medium ml-1">
          Social Media Link
        </Label>
        <Input
          id="socialMedia"
          placeholder="Instagram, Twitter, or TikTok URL"
          value={formData.socialMedia}
          onChange={(e) => setFormData((prev) => ({ ...prev, socialMedia: e.target.value }))}
          className="bg-muted/30 border-muted-foreground/20 focus:border-purple-500/50 transition-all h-10"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contentCategory" className="text-sm font-medium ml-1">
          Content Category
        </Label>
        <Select value={formData.contentCategory} onValueChange={(value) => setFormData((prev) => ({ ...prev, contentCategory: value }))}>
          <SelectTrigger className="w-full bg-muted/30 border-muted-foreground/20 h-10">
            <SelectValue placeholder="Select your content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lifestyle">Lifestyle & Vlog</SelectItem>
            <SelectItem value="fashion">Fashion & Modeling</SelectItem>
            <SelectItem value="fitness">Fitness & Health</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="cosplay">Cosplay</SelectItem>
            <SelectItem value="art">Art & Creative</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="foundVia" className="text-sm font-medium ml-1">
          How did you hear about us?
        </Label>
        <Input
          id="foundVia"
          placeholder="e.g. Twitter, Friend, Google..."
          value={formData.foundVia}
          onChange={(e) => setFormData((prev) => ({ ...prev, foundVia: e.target.value }))}
          className="bg-muted/30 border-muted-foreground/20 focus:border-purple-500/50 transition-all h-10"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation" className="text-sm font-medium ml-1">
          Why do you want to become a creator?
        </Label>
        <Textarea
          id="motivation"
          placeholder="Tell us about your content and goals..."
          value={formData.motivation}
          onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
          className="bg-muted/30 border-muted-foreground/20 focus:border-purple-500/50 transition-all min-h-20 resize-none"
          required
        />
      </div>

      <Button
        type="button"
        className="w-full mt-2"
        onClick={() => setActiveTab('video')}
        disabled={
          !formData.fullName.trim() ||
          !formData.socialMedia.trim() ||
          !formData.contentCategory ||
          !formData.foundVia.trim() ||
          !formData.motivation.trim()
        }
      >
        Next Step <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </TabsContent>
  );
};
