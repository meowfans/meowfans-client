'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
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
    answer: 'Visit the “Help & Support” section or email support@meowfans.com. Response time is usually within 24–48 hours.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">MeowFans FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              className="w-full text-left p-4 font-medium flex justify-between items-center focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              {faq.question}
              <span className="ml-2 text-gray-500">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <div className="p-4 border-t">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQ;
