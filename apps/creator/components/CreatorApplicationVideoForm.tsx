import { Button } from '@workspace/ui/components/button';
import { Label } from '@workspace/ui/components/label';
import { TabsContent } from '@workspace/ui/components/tabs';
import { ArrowRight, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { RefObject } from 'react';
import { CreatorApplicationTabProps, VerificationAnswers } from './CreatorApplicationForm';

interface CreatorApplicationVideoFormProps {
  loading: boolean;
  uploading: boolean;
  selectedFile: File | null;
  formData: VerificationAnswers;
  onRemoveVideo: () => unknown;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  fileInputRef: RefObject<HTMLInputElement | null>;
  setActiveTab: React.Dispatch<React.SetStateAction<CreatorApplicationTabProps>>;
  setFormData: React.Dispatch<React.SetStateAction<VerificationAnswers>>;
}

export const CreatorApplicationVideoForm = ({
  loading,
  selectedFile,
  uploading,
  formData,
  setActiveTab,
  setFormData,
  fileInputRef,
  onFileChange,
  onRemoveVideo
}: CreatorApplicationVideoFormProps) => {
  return (
    <TabsContent value="video" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <Label className="text-sm font-medium ml-1 flex items-center justify-between">
          <span>Introduction Video (approx. 30s)</span>
          {uploading && <span className="text-xs text-muted-foreground animate-pulse">Uploading...</span>}
        </Label>
        <div className="bg-muted/30 border border-muted-foreground/10 rounded-lg p-3 text-[11px] sm:text-xs text-muted-foreground leading-relaxed space-y-1 mb-2">
          <p className="font-semibold text-foreground/80">Please ensure your video covers:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Your name and age</li>
            <li>Why you want to join MeowFans</li>
            <li>What kind of content you plan to create</li>
            <li>Must be clear and informative</li>
          </ul>
        </div>

        {!formData.videoUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group border-2 border-dashed border-muted-foreground/25 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="video/mp4,video/quicktime,video/webm"
              onChange={onFileChange}
              disabled={uploading}
            />
            <div className="p-3 bg-muted/50 rounded-full group-hover:bg-background transition-colors shadow-sm">
              {uploading ? (
                <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground/80 group-hover:text-purple-500 transition-colors">Click to Select Video</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, MOV, or WEBM (Max 50MB)</p>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden border border-muted/50 bg-black/5">
            <video src={formData.videoUrl} controls className="w-full h-48 object-cover bg-black" />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-red-500/90 text-white backdrop-blur-md border-0 transition-colors"
                onClick={onRemoveVideo}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveTab('questions')}>
          Back
        </Button>
        <Button
          type="submit"
          className="flex-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20"
          disabled={loading || uploading || !selectedFile}
        >
          {loading || uploading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploading ? 'Uploading...' : 'Submitting...'}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Submit Application <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </TabsContent>
  );
};
