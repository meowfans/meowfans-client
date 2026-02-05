'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import useAPI from '@/hooks/useAPI';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Textarea } from '@workspace/ui/components/textarea';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { FileType, MediaType } from '@workspace/ui/lib/enums';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, LogOut, Trash2, UploadCloud } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LogoutModal } from './modals/LogoutModal';

const emptyFormData = {
  fullName: '',
  socialMedia: '',
  contentCategory: '',
  foundVia: '',
  motivation: '',
  videoUrl: ''
};

export const CreatorApplicationForm = () => {
  const { upload } = useAPI();
  const { errorHandler } = useErrorHandler();
  const { setOpenLogoutModal } = useUtilsStore();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [formData, setFormData] = useState(emptyFormData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { submitCreatorVerificationDetails, loading } = useCreatorMutations();
  const [activeTab, setActiveTab] = useState('questions');

  useEffect(() => {
    setDisabled(
      !formData.fullName.trim() ||
        !formData.socialMedia.trim() ||
        !formData.contentCategory ||
        !formData.foundVia.trim() ||
        !formData.motivation.trim() ||
        !selectedFile
    );
  }, [formData, selectedFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', selectedFile!);

      const result = await upload({
        mediaType: MediaType.PROFILE_MEDIA,
        fileType: FileType.VIDEO,
        assetType: AssetType.Private,
        formData: data
      });

      await submitCreatorVerificationDetails({
        answers: {
          ...formData,
          videoUrl: result.rawUrl
        }
      });
    } catch (error) {
      errorHandler({ error });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, videoUrl: previewUrl }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveVideo = () => {
    if (formData.videoUrl) {
      URL.revokeObjectURL(formData.videoUrl);
    }
    setFormData((prev) => ({ ...prev, videoUrl: '' }));
    setSelectedFile(null);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // optional
    audio.loop = true;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        const resumeOnInteraction = () => {
          audio.play().catch(() => {});
          window.removeEventListener('click', resumeOnInteraction);
          window.removeEventListener('keydown', resumeOnInteraction);
        };

        window.addEventListener('click', resumeOnInteraction);
        window.addEventListener('keydown', resumeOnInteraction);
      }
    };

    playAudio();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background selection:bg-primary/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 text-xs bg-black/40 text-white/50 hover:text-white hover:bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-colors"
            onClick={() => setOpenLogoutModal(true)}
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sign Out
          </Button>
        </div>
        <audio ref={audioRef} src="/creator_application.mp3" />
        <Card className="relative overflow-hidden border-muted/40 bg-background/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/70">
              Creator Application
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/80">Tell us a bit about yourself to get started</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="video">Introduction Video</TabsTrigger>
                </TabsList>

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
                    <Select
                      value={formData.contentCategory}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, contentCategory: value }))}
                    >
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
                          onChange={handleFileChange}
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
                          <p className="text-sm font-medium text-foreground/80 group-hover:text-purple-500 transition-colors">
                            Click to Select Video
                          </p>
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
                            onClick={handleRemoveVideo}
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
              </Tabs>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <LogoutModal />
    </div>
  );
};
