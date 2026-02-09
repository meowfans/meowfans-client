'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Book, LifeBuoy, Mail, Search, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export function SupportView() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I monetize my content?',
      answer:
        'You can monetize through subscriptions, paid posts (vaults), and direct tips from fans. Go to your Studio to manage your pricing.'
    },
    {
      question: 'How do payouts work?',
      answer:
        'Payouts are processed weekly. You can track your earnings in the Analytics tab and manage your withdrawal methods in Account Settings.'
    },
    {
      question: 'What type of content is allowed?',
      answer:
        'Please refer to our Content Guidelines for a detailed list of prohibited content. We maintain a safe community for all creators and fans.'
    },
    {
      question: 'How do I handle fan harassment?',
      answer: 'You can block any fan from your Channels page or use the safety settings to restrict who can message you.'
    },
    {
      question: 'Can I change my creator username?',
      answer: 'Yes, you can update your username in the Studio Settings once every 30 days.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
              <LifeBuoy className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl "
          >
            Creator Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Need help managing your Studio? Search our documentation or reach out to our dedicated creator success team.
          </motion.p>
        </div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            className="h-14 pl-12 rounded-full bg-secondary/30 border-white/10 text-lg focus-visible:ring-primary/30 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { title: 'Creator Docs', icon: Book, desc: 'Step-by-step guides', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { title: 'Contact Studio Support', icon: Mail, desc: 'Direct assistance', color: 'text-purple-500', bg: 'bg-purple-500/10' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              <Card className="border-none bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer group">
                <CardHeader className="flex flex-col items-center text-center gap-2 pb-2">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
                      item.bg
                    )}
                  >
                    <item.icon className={cn('h-6 w-6', item.color)} />
                  </div>
                  <CardTitle className="font-bold text-lg italic uppercase tracking-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Creator FAQs</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/5 rounded-2xl bg-secondary/5 px-4 sm:px-6 hover:bg-secondary/10 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-6 font-bold text-left text-base lg:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No results found for &quot;{searchQuery}&quot;.</p>
              <Button variant="link" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            </div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-primary/5 rounded-[2rem] border border-primary/10 p-8 md:p-12 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-32 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl  leading-none">Still need help?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium">
              Dedicated support for our creators is available 24/7. We usually respond within 2 hours.
            </p>
            <Button
              size="lg"
              className="rounded-full px-10 font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/25 hover:scale-105 transition-transform h-14"
            >
              Raise a Ticket
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
