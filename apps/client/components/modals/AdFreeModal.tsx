'use client';

import { useFan } from '@/hooks/context/UserContextWrapper';
import { useZonesStore } from '@/hooks/store/zones.store';
import { useZones } from '@/hooks/useZones';
import { configService } from '@/util/config';
import { handleBenefits } from '@/util/helpers';
import { GetZonePlansOutput, PurchaseType, ZoneTypes } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group';
import { LinkDescription } from '@workspace/ui/globals/LinkDescription';
import { handleFormatNumberToKAndM } from '@workspace/ui/lib';
import { cn } from '@workspace/ui/lib/utils';
import { Modal } from '@workspace/ui/modals/Modal';
import { Aperture } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AuthAwareButton } from '../AuthAwareButton';
import { Paypal } from '../Paypal';

interface ZonePlans extends GetZonePlansOutput {
  label: string;
  tagline: string;
  bestFor: string;
  benefits: string[];
}

export default function AdFreeModal() {
  const { fan } = useFan();
  const { zonePlans, loading, setLoading } = useZones();
  const currentZone = fan?.currentZone;
  const { openZone, setOpenZone } = useZonesStore();
  const [selected, setSelected] = useState<ZonePlans | null>(null);
  const [transactionStarted, setTransactionStarted] = useState<boolean>(false);

  const implementedZonePlans = zonePlans.map((plan) => ({
    ...plan,
    ...handleBenefits(plan.zoneType)
  }));

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setTransactionStarted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setSelected(null);
    setTransactionStarted(false);
  };

  useEffect(() => {
    if (zonePlans.length > 0 && !selected) {
      setSelected(implementedZonePlans[0]);
    }
  }, [zonePlans, implementedZonePlans, selected]);

  return (
    <Modal
      isOpen={openZone}
      onClose={() => setOpenZone(false)}
      description="Go Ad Free"
      title="Enjoy an uninterrupted experience — no banners, no pre-rolls."
    >
      <div className="text-lg">Choose a plan</div>
      <div className={(cn('text-xs'), fan?.hasZoneMembership ? 'text-yellow-300' : 'text-muted-foreground')}>
        {fan?.hasZoneMembership ? 'You are already having a subscription' : 'Pick the plan that fits you. You can cancel anytime.'}
      </div>

      {zonePlans.length === 0 && <p className="text-sm text-muted-foreground mt-3">Loading plans...</p>}

      {zonePlans.length > 0 && (
        <div className="mt-2">
          <RadioGroup
            value={selected?.id ?? implementedZonePlans[0].id}
            onValueChange={(val: string) => {
              setSelected(implementedZonePlans.find((p) => p.id === val) || null);
            }}
            className="space-y-1"
          >
            {implementedZonePlans.map((opt) => {
              const subscribedZone = currentZone && currentZone.zoneType === opt.zoneType;
              return (
                <label
                  key={opt.id}
                  className={(cn('flex items-center justify-between gap-4 p-3 rounded-xl border'), subscribedZone ? 'animate-pulse' : '')}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={opt.id} id={`plan-${opt.id}`} />
                    <div>
                      <div className="flex flex-row space-x-2">
                        {subscribedZone && (
                          <div className="font-semibold">
                            <Aperture className="animate-spin" />
                          </div>
                        )}
                        <div className="font-semibold">{opt.label}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">{opt.tagline}</div>
                      <div className="text-xs text-muted-foreground">Best for: {opt.bestFor}</div>
                      {opt.benefits.map((b, idx) => (
                        <div key={idx} className="text-sm flex flex-col text-muted-foreground">
                          ✨{b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-medium">{handleFormatNumberToKAndM(opt.unlockPrice)}</div>
                    {opt.zoneType !== ZoneTypes.Onetime && <div className="text-xs text-muted-foreground">/ {opt.label}</div>}
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>
      )}

      {selected && (
        <div className="mt-3">
          <Card className="rounded-2xl">
            <CardContent className="flex items-center flex-col justify-between gap-4 p-4">
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Selected</div>
                  <div className="font-semibold text-lg">
                    {selected.label} • {handleFormatNumberToKAndM(selected.unlockPrice)}
                  </div>
                  <div className="text-xs text-muted-foreground">Billed {selected.label}</div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <AuthAwareButton onClick={handleSubscribe} disabled={loading} variant={'outline'}>
                    {loading ? 'Processing...' : 'Subscribe'}
                  </AuthAwareButton>

                  <Button variant="outline" onClick={() => setOpenZone(false)} size={'sm'}>
                    Maybe later
                  </Button>
                </div>
              </div>
              {transactionStarted && (
                <div className="w-full">
                  <Paypal
                    username={fan?.user.username}
                    entityId={selected?.id as string}
                    purchaseType={PurchaseType.Zone}
                    quantity={1}
                    amount={selected?.unlockPrice as number}
                    zoneType={selected?.zoneType as ZoneTypes}
                    creatorId={configService.NEXT_PUBLIC_DEFAULT_CREATOR_ID}
                    onTransactionDone={handleClose}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <small className="text-xs text-muted-foreground">
        By continuing you agree to our <LinkDescription href="/terms" description="Terms" /> and{' '}
        <LinkDescription href="/privacy" description="Privacy Policy" />.
      </small>
    </Modal>
  );
}
