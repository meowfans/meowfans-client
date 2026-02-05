'use client';

import { useUtilsStore } from '@/hooks/store/utils.store';
import useAPI from '@/hooks/useAPI';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { AssetType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { FileType, MediaType } from '@workspace/ui/lib/enums';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CreatorApplicationDescriptionForm } from './CreatorApplicationDescriptionForm';
import { CreatorApplicationVideoForm } from './CreatorApplicationVideoForm';
import { LogoutModal } from './modals/LogoutModal';

export interface VerificationAnswers {
  fullName: string;
  socialMedia: string;
  contentCategory: string;
  foundVia: string;
  motivation: string;
  videoUrl: string;
}
const emptyFormData: VerificationAnswers = {
  fullName: '',
  socialMedia: '',
  contentCategory: '',
  foundVia: '',
  motivation: '',
  videoUrl: ''
};

export type CreatorApplicationTabProps = 'questions' | 'video';

export const CreatorApplicationForm = () => {
  const { upload } = useAPI();
  const { errorHandler } = useErrorHandler();
  const { setOpenLogoutModal } = useUtilsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [formData, setFormData] = useState<VerificationAnswers>(emptyFormData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { submitCreatorVerificationDetails, loading } = useCreatorMutations();
  const [activeTab, setActiveTab] = useState<CreatorApplicationTabProps>('questions');

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
              <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as CreatorApplicationTabProps)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="video">Introduction Video</TabsTrigger>
                </TabsList>
                <CreatorApplicationDescriptionForm formData={formData} setActiveTab={setActiveTab} setFormData={setFormData} />
                <CreatorApplicationVideoForm
                  fileInputRef={fileInputRef}
                  formData={formData}
                  loading={loading}
                  onFileChange={handleFileChange}
                  onRemoveVideo={handleRemoveVideo}
                  selectedFile={selectedFile}
                  setActiveTab={setActiveTab}
                  setFormData={setFormData}
                  uploading={uploading}
                />
              </Tabs>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <LogoutModal />
    </div>
  );
};
