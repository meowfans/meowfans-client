'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { useSuccessHandler } from '@workspace/ui/hooks/useSuccessHandler';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Bug, Lightbulb, MessageSquare, Send, Smile, Star } from 'lucide-react';
import { useState } from 'react';

export function FeedbackView() {
  const { successHandler } = useSuccessHandler();
  const [loading, setLoading] = useState<boolean>(false);
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
    { id: 'general', label: 'Studio Feedback', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'compliment', label: 'Compliment', icon: Smile, color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl ">
            Share Your Feedback
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-medium text-lg leading-tight"
          >
            Help us build the best platform for your creative business.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <Card className="border-none bg-secondary/10 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <CardContent className="p-8 md:p-12 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Feedback Type Selection */}
                <div className="space-y-4">
                  <Label className="text-xs font-black italic uppercase tracking-widest text-muted-foreground/50 px-1">Categories</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: cat.id })}
                        className={cn(
                          'flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-200 hover:bg-secondary/30',
                          formData.type === cat.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-transparent bg-secondary/20'
                        )}
                      >
                        <cat.icon className={cn('h-6 w-6', cat.color)} />
                        <span
                          className={cn(
                            'text-[10px] font-black uppercase tracking-tight text-center italic',
                            formData.type === cat.id ? 'text-foreground font-black' : 'text-muted-foreground'
                          )}
                        >
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-4">
                  <Label className="text-xs font-black italic uppercase tracking-widest text-muted-foreground/50 px-1 text-center block">
                    Studio Experience Rating
                  </Label>
                  <div className="flex justify-center gap-2 p-5 bg-secondary/20 rounded-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star.toString() })}
                        className="focus:outline-none transition-transform hover:scale-125 active:scale-90"
                      >
                        <Star
                          className={cn(
                            'h-8 w-8 transition-colors',
                            parseInt(formData.rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/20'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Inputs */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-xs font-black italic uppercase tracking-widest text-muted-foreground/50 px-1">
                      Subject
                    </Label>
                    <Input
                      id="title"
                      placeholder="Briefly describe your point..."
                      className="h-14 bg-secondary/30 rounded-2xl border-none focus-visible:ring-primary/20 font-bold"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-black italic uppercase tracking-widest text-muted-foreground/50 px-1">
                      Your Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Share your thoughts or detailed report..."
                      className="min-h-[160px] bg-secondary/30 rounded-2xl border-none focus-visible:ring-primary/20 resize-none p-5 font-medium leading-relaxed"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase italic text-sm tracking-widest shadow-xl shadow-primary/25 transition-all hover:translate-y-[-4px]"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending Report...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit to Studio Team <Send className="h-4 w-4" />
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
