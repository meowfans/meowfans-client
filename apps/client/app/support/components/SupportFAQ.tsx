'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface SupportFAQProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SupportFAQ({ searchQuery, setSearchQuery }: SupportFAQProps) {
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
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <AccordionTrigger className="hover:no-underline py-6 font-bold text-left text-base lg:text-lg">{faq.question}</AccordionTrigger>
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
  );
}
