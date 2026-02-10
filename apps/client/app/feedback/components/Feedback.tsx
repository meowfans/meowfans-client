'use client';

import { Card, CardContent } from '@workspace/ui/components/card';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { FeedbackType } from '@workspace/ui/lib/enums';
import { FeedbackFormData } from '@workspace/ui/lib/types';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { FeedbackAdditionalInputs } from './FeedbackAdditionalInputs';
import { FeedbackGeneralCompliment } from './FeedbackGeneralCompliment';
import { FeedbackHeader } from './FeedbackHeader';
import { FeedbackTypeSelection } from './FeedbackTypeSelection';
import { PageHandler } from '@/components/PageHandler';

const emptyFormData: FeedbackFormData = {
  type: FeedbackType.General,
  rating: '5',
  title: '',
  message: ''
};

export function Feedback() {
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>(emptyFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      successHandler({ message: 'Thank you for your feedback! We appreciate it.' });
      setFormData(emptyFormData);
    }, 1500);
  };

  return (
    <PageHandler isEmpty={false} isLoading={false}>
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-8">
          <FeedbackHeader />

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
            <Card className="border-none bg-secondary/10 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <CardContent className="p-8 md:p-10 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <FeedbackTypeSelection formData={formData} setFormData={setFormData} />
                  <FeedbackGeneralCompliment formData={formData} setFormData={setFormData} />
                  <FeedbackAdditionalInputs formData={formData} setFormData={setFormData} />

                  <LoadingButtonV2
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px]"
                    loading={loading}
                    variant="default"
                  >
                    <span className="flex items-center gap-2">
                      Submit Feedback <Send className="h-4 w-4" />
                    </span>
                  </LoadingButtonV2>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageHandler>
  );
}
