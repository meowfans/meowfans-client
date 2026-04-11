'use client';

import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function TestErrorPage() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error('This is a test error to preview the error page design!');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black italic uppercase tracking-tight">Error Page Test</h1>
          <p className="text-sm text-muted-foreground">
            Click the button below to trigger an error and see how the custom error page looks.
          </p>
        </div>

        <Button
          onClick={() => setShouldThrowError(true)}
          variant="destructive"
          size="lg"
          className="w-full rounded-full font-black uppercase tracking-widest"
        >
          Throw Test Error
        </Button>

        <p className="text-xs text-muted-foreground/60">This will trigger the custom error.tsx page</p>
      </Card>
    </div>
  );
}
