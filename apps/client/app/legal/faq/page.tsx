'use client';

import { HelpCircle } from 'lucide-react';
import { LegalPageView } from '../components/LegalPageView';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How do I become a creator?',
      a: "To become a creator, click on the 'Become a Creator' link in the sidebar and complete the application process, which includes identity verification."
    },
    {
      q: 'What are the payout methods?',
      a: 'We support direct bank transfers, wire transfers, and several digital wallet options. Payouts are typically processed weekly.'
    },
    {
      q: 'How do I cancel my subscription?',
      a: "You can manage and cancel your subscriptions at any time through the 'Subscriptions' section in your account settings."
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, we use industry-standard encryption and security protocols to protect your personal and payment information.'
    }
  ];

  return (
    <LegalPageView title="Frequency Asked Questions" icon={HelpCircle}>
      <p className="lead">Find quick answers to common questions about MeowFans.</p>

      <div className="space-y-12 mt-12">
        {faqs.map((faq, i) => (
          <div key={i} className="group">
            <h3 className="text-xl font-black uppercase italic mb-4 flex items-center gap-3 group-hover:text-primary transition-colors">
              <span className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] text-primary border border-primary/20">
                Q
              </span>
              {faq.q}
            </h3>
            <div className="pl-9 text-muted-foreground leading-relaxed">{faq.a}</div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-[2rem] bg-secondary/15 border border-white/5 text-center">
        <h3 className="mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-bold">Our support team is always ready to help.</p>
        <button className="rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest h-11 px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Contact Support
        </button>
      </div>
    </LegalPageView>
  );
}
