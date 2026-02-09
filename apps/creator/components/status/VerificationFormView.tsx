'use client';

import { useCreator } from '@/hooks/context/useCreator';
import useAPI from '@/hooks/useAPI';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { FileType, MediaType } from '@workspace/ui/lib';
import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardCheck, Globe, Loader2, LogOut, MessageSquare, Sparkles, Upload, User, Video, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export function VerificationFormView() {
  const router = useRouter();
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();
  const { submitCreatorVerificationDetails, loading } = useCreatorMutations();
  const { upload, logout } = useAPI();

  const { creator } = useCreator();
  const existingAnswers = (creator?.verification?.answers as any) || {};

  const [formData, setFormData] = useState({
    fullName: existingAnswers.fullName || '',
    socialMedia: existingAnswers.socialMedia || '',
    contentCategory: existingAnswers.contentCategory || '',
    foundVia: existingAnswers.foundVia || '',
    motivation: existingAnswers.motivation || '',
    videoUrl: existingAnswers.videoUrl || ''
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(existingAnswers.videoUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let finalVideoUrl = formData.videoUrl;

      // If there's a new video file, upload it first
      if (videoFile) {
        setIsUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', videoFile);

        const { rawUrl } = await upload({
          mediaType: MediaType.PROFILE_MEDIA,
          formData: formDataUpload,
          fileType: FileType.VIDEO,
          assetType: AssetType.Private
        });
        finalVideoUrl = rawUrl;

        setIsUploading(false);
      }
      if (!finalVideoUrl) {
        return errorHandler({ msg: 'Video URL is required' });
      }

      // Submit verification details with the video URL
      await submitCreatorVerificationDetails({
        answers: {
          ...formData,
          videoUrl: finalVideoUrl
        }
      });

      successHandler({ message: 'Verification details submitted successfully!' });
      router.refresh();
    } catch (error) {
      setIsUploading(false);
      errorHandler({ error });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      errorHandler({ msg: 'Video size must be less than 50MB' });
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreviewUrl(blobUrl);
    setFormData((prev) => ({ ...prev, videoUrl: '' }));
  };

  const handleRemoveVideo = () => {
    if (videoPreviewUrl && videoPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setFormData((prev) => ({ ...prev, videoUrl: '' }));
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleSwitchAccount = () => {
    logout();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 flex items-center justify-center overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/3 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full relative z-10 space-y-4 sm:space-y-6"
      >
        {/* Top Actions */}
        <div className="flex justify-end items-center gap-2 sm:gap-4">
          <ApplyTheme />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground font-black uppercase tracking-widest text-[9px] sm:text-[10px] gap-1.5"
            onClick={handleSwitchAccount}
          >
            <LogOut className="h-3 w-3" />
            <span className="hidden xs:inline">Switch Account</span>
            <span className="xs:hidden">Switch</span>
          </Button>
        </div>

        {/* Main Card */}
        <Card className="border-none bg-card/50 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3.5rem] shadow-2xl border border-border/50 space-y-8 sm:space-y-10">
          {/* Header */}
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-16 w-16 sm:h-20 sm:w-20 bg-primary/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-primary mx-auto shadow-inner border border-primary/20 rotate-3"
            >
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl  leading-none">
              Creator <span className="text-primary">Verification</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-md mx-auto px-4">
              Welcome to the inner circle. To protect our community and your brand, we need a few more details before you start creating.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Grid Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <User className="h-3 w-3 shrink-0" />
                  <span>Full Name</span>
                </Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Legal full name"
                  className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-muted/50 border-border/50 focus-visible:ring-primary/30 font-bold px-4 sm:px-6 text-sm sm:text-base"
                />
              </div>

              {/* Social Media */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Globe className="h-3 w-3 shrink-0" />
                  <span>Social Media</span>
                </Label>
                <Input
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  required
                  placeholder="Instagram, Twitter, or Portfolio URL"
                  className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-muted/50 border-border/50 focus-visible:ring-primary/30 font-bold px-4 sm:px-6 text-sm sm:text-base"
                />
              </div>

              {/* Content Category */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-3 w-3 shrink-0" />
                  <span>Content Category</span>
                </Label>
                <Input
                  name="contentCategory"
                  value={formData.contentCategory}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Fashion, Art, Gaming"
                  className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-muted/50 border-border/50 focus-visible:ring-primary/30 font-bold px-4 sm:px-6 text-sm sm:text-base"
                />
              </div>

              {/* Found Us Via */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="h-3 w-3 shrink-0" />
                  <span>Found Us Via</span>
                </Label>
                <Input
                  name="foundVia"
                  value={formData.foundVia}
                  onChange={handleChange}
                  required
                  placeholder="Where did you hear about us?"
                  className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-muted/50 border-border/50 focus-visible:ring-primary/30 font-bold px-4 sm:px-6 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ClipboardCheck className="h-3 w-3 shrink-0" />
                <span>Motivation</span>
              </Label>
              <Textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                placeholder="Why do you want to join our creator ecosystem? Tell us about your content and goals..."
                className="min-h-[100px] sm:min-h-[120px] rounded-xl sm:rounded-[1.5rem] bg-muted/50 border-border/50 focus-visible:ring-primary/30 font-bold p-4 sm:p-6 leading-relaxed text-sm sm:text-base resize-none"
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Video className="h-3 w-3 shrink-0" />
                <span>Introduction Video</span>
              </Label>

              {/* Video Preview */}
              {videoPreviewUrl ? (
                <div className="space-y-3">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-muted/50 border border-border/50">
                    <video src={videoPreviewUrl} controls className="w-full max-h-[300px] sm:max-h-[400px] object-contain">
                      Your browser does not support the video tag.
                    </video>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleRemoveVideo}
                      className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 shadow-lg"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {videoFile ? `${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(2)} MB)` : 'Video ready'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center h-32 sm:h-40 rounded-xl sm:rounded-2xl bg-muted/50 border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                    <span className="text-sm sm:text-base font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      Click to upload video
                    </span>
                    <span className="text-xs text-muted-foreground/60 mt-1">MP4, MOV, AVI (Max 100MB)</span>
                  </label>
                </div>
              )}

              <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-widest px-2 italic">
                A short video (30-60s about 50MB) introducing yourself helps us verify you faster.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || isUploading || (!videoFile && !videoPreviewUrl)}
              className="w-full h-14 sm:h-16 rounded-xl sm:rounded-[1.5rem] bg-primary hover:bg-primary/90 text-primary-foreground font-black italic uppercase tracking-widest gap-2 sm:gap-4 shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:translate-y-0 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span>Uploading Video...</span>
                </>
              ) : loading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span>Processing Submission...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Request Full Access</span>
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground/50">
            Secure Submission &bull; Encrypted &bull; 24h Review Window
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
