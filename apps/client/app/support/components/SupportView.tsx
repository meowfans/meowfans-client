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
      question: 'How do I reset my password?',
      answer:
        "You can reset your password by going to the login page and clicking on 'Forgot Password'. Follow the instructions sent to your email."
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'Go to your settings page, navigate to the Billing tab, and select "Manage Subscription". You can cancel anytime.'
    },
    {
      question: 'Is my payment information secure?',
      answer:
        'Yes, we use industry-standard encryption and processed by secure payment gateways. We do not store your full credit card details.'
    },
    {
      question: 'How do I contact a creator?',
      answer: 'You can send a direct message to a creator if you are subscribed to them, or if they have open DMs enabled.'
    },
    {
      question: 'How do I report a post?',
      answer: 'Click on the three dots icon on any post and select "Report". Our team will review it shortly.'
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
            Help & Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Have questions? We&apos;re here to help. Search our knowledge base or get in touch with our support team.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Knowledge Base', icon: Book, desc: 'Browse detailed guides', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { title: 'Email Us', icon: Mail, desc: 'Get localized help', color: 'text-purple-500', bg: 'bg-purple-500/10' }
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
                  <CardTitle className="font-bold text-lg">{item.title}</CardTitle>
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
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/5 rounded-2xl bg-secondary/5 px-4 sm:px-6 hover:bg-secondary/10 transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} // Check if this override is needed
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
            <h2 className="text-3xl ">Still need help?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-medium">
              Our support team is available 24/7 to assist you with any issues you may have. Don&apos;t hesitate to reach out!
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/25 hover:scale-105 transition-transform h-14"
            >
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
