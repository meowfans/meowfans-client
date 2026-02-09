'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Bug, Lightbulb, MessageSquare, Send, Smile, Star } from 'lucide-react';
import { useState } from 'react';

export function FeedbackView() {
  const { successHandler } = useSuccessHandler();
  const { errorHandler } = useErrorHandler();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'general',
    rating: '5',
    title: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      successHandler({ message: 'Thank you for your feedback! We appreciate it.' });
      setFormData({ type: 'general', rating: '5', title: '', message: '' });
    }, 1500);
  };

  const categories = [
    { id: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'bug', label: 'Report a Bug', icon: Bug, color: 'text-red-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'compliment', label: 'Compliment', icon: Smile, color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl ">
            We Value Your Feedback
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-medium"
          >
            Help us improve your experience by sharing your thoughts.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <Card className="border-none bg-secondary/10 backdrop-blur-3xl shadow-2xl rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <CardContent className="p-8 md:p-10 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Feedback Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-bold uppercase tracking-wide text-muted-foreground/70">Feedback Categories</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {categories.map((cat) => (
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
                        <span
                          className={cn(
                            'text-xs font-bold text-center',
                            formData.type === cat.id ? 'text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating (only for general/compliment) */}
                {(formData.type === 'general' || formData.type === 'compliment') && (
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
                )}

                {/* Additional Inputs */}
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

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px]"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Feedback <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
