'use client';

import { Separator } from '@workspace/ui/components/separator';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I create a MeowFans account?',
    answer:
      'Click on the “Sign Up” button on the top-right corner of the homepage. Enter your email, create a username and password, and verify your email. You’re ready to explore!'
  },
  {
    question: 'I forgot my password. What should I do?',
    answer:
      'Click on “Forgot Password?” on the login page, enter your registered email, and follow the instructions to reset your password.'
  },
  {
    question: 'How do I follow a creator?',
    answer: 'Visit the creator’s profile and click the “Follow” or “Subscribe” button. Some content may require a paid subscription.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept major credit/debit cards, PayPal, and other regional payment options.'
  },
  {
    question: 'Will creators know my personal information?',
    answer: 'No. Creators only see your username and subscription details. Your personal information is confidential.'
  },
  {
    question: 'How can I become a creator on MeowFans?',
    answer: 'Click “Become a Creator” on the homepage, fill out the application, and once approved, start uploading content and earning.'
  },
  {
    question: 'How do I contact MeowFans support?',
    answer: 'Visit the “Help & Support” section or email support@meowfans.app. Response time is usually within 24–48 hours.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Frequently Asked Questions</h1>
        <p className="text-lg text-zinc-400">Answers to common questions about using MeowFans.</p>
      </div>
      <Separator className="bg-zinc-800" />

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-hidden transition-all duration-200 hover:border-zinc-700"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-zinc-200 transition-colors hover:text-white"
              >
                {faq.question}
                <ChevronDown
                  className={cn('h-4 w-4 shrink-0 transition-transform duration-200 text-zinc-500', isOpen && 'rotate-180 text-white')}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 pt-0 text-zinc-400">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
