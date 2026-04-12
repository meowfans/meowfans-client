'use client';

import { useVaultMutations } from '@/hooks/useVaults';
import { Button } from '@workspace/ui/components/button';
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group';
import { LoadingButtonV2 } from '@workspace/ui/globals/LoadingButtonV2';
import { Modal } from '@workspace/ui/modals/Modal';
import { AlertTriangle, Ban, StopCircleIcon } from 'lucide-react';
import { useState } from 'react';

export function TerminateModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { terminateDownloading, terminateImportJobs, loading } = useVaultMutations();
  const [terminationType, setTerminationType] = useState<'downloading' | 'importing'>('downloading');

  const title = terminationType === 'importing' ? 'Terminate All Jobs' : 'Terminate Downloading';
  const description =
    terminationType === 'importing'
      ? 'Are you sure you want to completely stop ALL background jobs? This action cannot be undone.'
      : 'Are you sure you want to stop all active download tasks? Currently downloading files will be interrupted.';

  const handleTerminate = async () => {
    if (terminationType === 'importing') {
      await terminateImportJobs();
    } else {
      await terminateDownloading();
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)} size={'sm'}>
        <Ban className="h-3 w-3" />
        Stop Tasks
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <StopCircleIcon className="h-5 w-5 text-destructive" />
            <span className="font-black uppercase tracking-tighter">{title}</span>
          </div>
        }
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Select Termination Level</p>
            <RadioGroup
              defaultValue="downloading"
              onValueChange={(value) => setTerminationType(value as 'downloading' | 'importing')}
              className="grid grid-cols-2 gap-4"
            >
              <div
                className={`flex items-center space-x-2 p-3 rounded-xl border transition-all cursor-pointer ${
                  terminationType === 'downloading' ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setTerminationType('downloading')}
              >
                <RadioGroupItem value="downloading" id="downloading" />
                <label htmlFor="downloading" className="font-black uppercase tracking-tighter text-[10px] cursor-pointer w-full">
                  Downloading
                </label>
              </div>

              <div
                className={`flex items-center space-x-2 p-3 rounded-xl border transition-all cursor-pointer ${
                  terminationType === 'importing' ? 'border-destructive bg-destructive/5' : 'border-border'
                }`}
                onClick={() => setTerminationType('importing')}
              >
                <RadioGroupItem value="importing" id="importing" />
                <label htmlFor="importing" className="font-black uppercase tracking-tighter text-[10px] cursor-pointer w-full">
                  All Jobs
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/10 bg-destructive/5 text-destructive/80">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold leading-relaxed uppercase tracking-tight">
              {description} This action may leave some tasks in an inconsistent state.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={loading}
              className="flex-1 font-bold uppercase tracking-tight rounded-xl h-11"
            >
              Cancel
            </Button>
            <LoadingButtonV2
              loading={loading}
              onClick={handleTerminate}
              className="flex-1 font-black uppercase tracking-tight shadow-lg shadow-destructive/20 rounded-xl h-11"
              variant="destructive"
            >
              Confirm Terminate
            </LoadingButtonV2>
          </div>
        </div>
      </Modal>
    </>
  );
}
