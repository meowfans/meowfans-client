'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { AlertTriangle, CreditCard, Download, ExternalLink, History, Plus } from 'lucide-react';
import Link from 'next/link';

const INVOICES = [
  { id: 'INV-2023-001', date: 'Oct 01, 2023', amount: '$9.99', status: 'Paid', plan: 'Pro Monthly' },
  { id: 'INV-2023-002', date: 'Sep 01, 2023', amount: '$9.99', status: 'Paid', plan: 'Pro Monthly' },
  { id: 'INV-2023-003', date: 'Aug 01, 2023', amount: '$9.99', status: 'Paid', plan: 'Pro Monthly' }
];

const PAYMENT_METHODS = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '12/24', isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false }
];

export function Billing() {
  const currentPlan = {
    name: 'Pro Monthly',
    price: '$9.99',
    period: 'mo',
    renewalDate: 'Nov 01, 2023',
    status: 'Active'
  };

  const handleDownloadInvoice = (id: string) => {
    console.log('Downloading invoice', id);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl  flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-primary" />
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground font-medium">Manage your plan, payment methods, and billing history.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card className="border-none bg-gradient-to-br from-secondary/10 to-secondary/5 ring-1 ring-white/5 overflow-hidden rounded-[2rem]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Current Plan</CardTitle>
                    <CardDescription>
                      You are currently subscribed to the <span className="font-bold text-foreground">{currentPlan.name}</span> plan.
                    </CardDescription>
                  </div>
                  <Badge
                    variant="default"
                    className="bg-primary/20 text-primary hover:bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest border-none"
                  >
                    {currentPlan.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">{currentPlan.price}</span>
                  <span className="text-muted-foreground font-bold text-lg uppercase">/{currentPlan.period}</span>
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/20">
                    <span>Next Billing Date</span>
                    <span className="text-foreground font-bold">{currentPlan.renewalDate}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/20">
                    <span>Payment Method</span>
                    <span className="text-foreground font-bold flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> **** 4242
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl font-bold uppercase tracking-wide">
                  Change Plan
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 rounded-xl font-bold uppercase tracking-wide bg-destructive/10 text-destructive hover:bg-destructive/20 border-none shadow-none"
                >
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none bg-secondary/5 ring-1 ring-white/5 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="font-black uppercase tracking-tight text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-secondary/10 hover:bg-secondary/20 transition-colors border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-14 rounded bg-white/5 flex items-center justify-center border border-white/10">
                        <span className="font-bold text-xs uppercase text-muted-foreground">{method.brand}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">•••• •••• •••• {method.last4}</span>
                        <span className="text-xs text-muted-foreground font-medium">Expires {method.expiry}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border-none"
                        >
                          Default
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full rounded-xl border-dashed border-2 border-white/10 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all font-bold uppercase text-xs tracking-widest h-12 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-none bg-secondary/5 ring-1 ring-white/5 rounded-[2rem] h-fit">
              <CardHeader>
                <CardTitle className="font-black uppercase tracking-tight text-xl flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {INVOICES.map((invoice, i) => (
                  <div key={invoice.id} className="relative">
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/20 transition-colors group cursor-pointer">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-sm">{invoice.date}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{invoice.id}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">{invoice.amount}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {i !== INVOICES.length - 1 && <Separator className="bg-white/5 my-1" />}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="w-full text-muted-foreground text-xs uppercase font-bold tracking-widest hover:text-primary"
                >
                  View All Invoices
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none bg-gradient-to-br from-primary/10 to-transparent ring-1 ring-white/5 rounded-[2rem] overflow-hidden">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-primary">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black uppercase italic tracking-tight">Need Billing Support?</h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Having trouble with a payment or have a question about your invoice?
                  </p>
                </div>
                <Button asChild className="w-full rounded-xl font-bold uppercase tracking-wide" variant="secondary">
                  <Link href="/support">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
