'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { CheckCircle2, ChevronRight, Circle } from 'lucide-react';
import Link from 'next/link';

export function ActionItems() {
  const tasks = [
    { id: 1, label: 'Complete your profile bio', completed: true, link: '/settings' },
    { id: 2, label: 'Upload your first post', completed: false, link: '/posts-studio' },
    { id: 3, label: 'Create a subscription tier', completed: false, link: '/subscriptions' },
    { id: 4, label: 'Set up payout details', completed: false, link: '/billing' },
    { id: 5, label: 'Create a welcome vault', completed: false, link: '/vaults-studio' }
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>What needs to be done</CardTitle>
        <CardDescription>Complete these tasks to optimize your creator journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="grid gap-1">
                  <span className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.label}</span>
                </div>
              </div>
              {!task.completed && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={task.link}>
                    Start <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
