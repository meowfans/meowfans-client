'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useReportMutations } from '@/hooks/useReports';
import { EntityType } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Textarea } from '@workspace/ui/components/textarea';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: string;
  entityType: EntityType;
}

const PRESET_REASONS = [
  'Inappropriate content',
  'Spam or misleading',
  'Harassment or hate speech',
  'Intellectual property violation',
  'Self-harm or violence',
  'Other'
];

export function ReportModal({ isOpen, onClose, entityId, entityType }: ReportModalProps) {
  const { fan } = useFan();
  const { createReport, loading } = useReportMutations();
  const [reason, setReason] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log('clicked', fan?.fanId, reason, selectedPreset, entityId, entityType);
    if ((!reason && !selectedPreset) || !entityId || !entityType || !fan) return;

    await createReport({
      entityId,
      entityType,
      reason: selectedPreset === 'Other' ? reason : selectedPreset || reason
    });
    onClose();
    setReason('');
    setSelectedPreset(null);
  };

  const handleClose = () => {
    onClose();
    setReason('');
    setSelectedPreset(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-[480px] rounded-[2rem] sm:rounded-[2.5rem] p-0 overflow-hidden border-none bg-background/80 backdrop-blur-2xl shadow-2xl">
        <div className="relative p-5 sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="h-12 w-12 sm:h-16 sm:w-16 bg-destructive/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 transition-transform hover:scale-110">
              <ShieldAlert className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tight italic">
                Report {entityType.toLowerCase()}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-medium text-xs sm:text-sm max-w-[280px] sm:max-w-[320px] mx-auto">
                Help us keep the community safe. All reports are reviewed by our moderation team.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Body Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_REASONS.map((r) => (
                <Button
                  key={r}
                  variant={selectedPreset === r ? 'destructive' : 'secondary'}
                  className={`h-10 sm:h-11 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all border ${
                    selectedPreset === r
                      ? 'border-destructive shadow-lg shadow-destructive/20'
                      : 'bg-secondary/30 border-white/5 hover:bg-secondary/50'
                  }`}
                  onClick={() => {
                    setSelectedPreset(r);
                    if (r !== 'Other') setReason('');
                  }}
                >
                  {r}
                </Button>
              ))}
            </div>

            {(selectedPreset === 'Other' || !selectedPreset) && (
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                  Describe the issue
                </label>
                <Textarea
                  placeholder="Tell us what's wrong..."
                  className="min-h-[100px] sm:min-h-[120px] bg-secondary/20 border-white/5 focus-visible:ring-primary/20 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-xs sm:text-sm transition-all"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/10 rounded-2xl sm:rounded-3xl border border-white/5">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground/80 leading-relaxed uppercase tracking-widest">
                Reports are anonymous. The creator will not see who reported them.
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <DialogFooter className="mt-8 sm:mt-10 sm:justify-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                variant="ghost"
                className="order-2 sm:order-1 flex-1 h-11 sm:h-12 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-white/5"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="order-1 sm:order-2 flex-[2] h-11 sm:h-12 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs shadow-xl shadow-primary/20"
                onClick={handleSubmit}
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
