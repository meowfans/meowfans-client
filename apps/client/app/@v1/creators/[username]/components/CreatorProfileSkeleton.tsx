'use client';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import React from 'react';

export const CreatorProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-2xl">
        <Skeleton className="h-44 sm:h-56 md:h-64 w-full bg-zinc-100 dark:bg-zinc-800/40 animate-pulse" />

        <CardContent className="relative -mt-16 px-6 sm:px-10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="rounded-full h-28 w-28 sm:h-32 sm:w-32 bg-zinc-100 dark:bg-zinc-800 animate-pulse border-4 border-white dark:border-zinc-900 shadow-md" />

              <div className="min-w-0">
                <Skeleton className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse mb-2" />
                <Skeleton className="h-4 w-72 max-w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                <div className="flex gap-3 mt-4">
                  <Skeleton className="h-9 w-28 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                  <Skeleton className="h-9 w-28 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <Skeleton className="h-9 w-28 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="px-2 sm:px-0">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="min-w-37.5 shrink-0 rounded-2xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-zinc-100 dark:border-zinc-700 py-4 px-3 shadow animate-pulse"
            >
              <Skeleton className="h-4 w-6 bg-zinc-200 dark:bg-zinc-700 rounded-md mb-2" />
              <Skeleton className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-md mb-2" />
              <Skeleton className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md" />
            </Skeleton>
          ))}
        </div>
      </div>

      <Separator />

      <Card className="rounded-2xl">
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="gallery">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <TabsList className="bg-transparent! p-0">
                <TabsTrigger value="gallery" className="px-3 py-2 rounded-md">
                  <Skeleton className="h-4 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                </TabsTrigger>
                <TabsTrigger value="vaults" className="px-3 py-2 rounded-md">
                  <Skeleton className="h-4 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                </TabsTrigger>
                <TabsTrigger value="about" className="px-3 py-2 rounded-md">
                  <Skeleton className="h-4 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto hidden sm:flex gap-2">
                <Button disabled className="opacity-80">
                  <Skeleton className="h-4 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                </Button>
              </div>
            </div>

            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 sm:h-44 md:h-48 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="vaults" className="mt-4">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="p-4 md:p-6 rounded-lg border border-zinc-100 dark:border-zinc-700 bg-white/40 dark:bg-zinc-900/40 animate-pulse"
                  >
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-14 w-14 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-48 bg-zinc-200 dark:bg-zinc-700 rounded-md mb-2" />
                        <Skeleton className="h-3 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-md" />
                      </div>
                    </div>
                  </Skeleton>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-4">
              <div className="space-y-3">
                <Skeleton className="h-4 w-56 bg-zinc-200 dark:bg-zinc-700 rounded-md animate-pulse" />
                <Skeleton className="h-3 w-full max-w-prose bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                <Skeleton className="h-3 w-full max-w-prose bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                <Skeleton className="h-3 w-3/4 max-w-prose bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
