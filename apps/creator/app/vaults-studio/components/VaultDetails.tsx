import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Textarea } from '@workspace/ui/components/textarea';
import { DollarSign } from 'lucide-react';

interface VaultDetailsProps {
  description: string;
  unlockPrice: number | undefined;
  onSetDescription: (description: string) => void;
  onSetUnlockPrice: (price: number | undefined) => void;
}

export const VaultDetails = ({ description, unlockPrice, onSetDescription, onSetUnlockPrice }: VaultDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vault Details</CardTitle>
        <CardDescription>Configure your exclusive collection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vault-description">Description</Label>
          <Textarea
            id="vault-description"
            placeholder="What's inside this vault?"
            value={description}
            onChange={(e) => onSetDescription(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">{description.length} characters</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vault-price">Vault Price</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="vault-price"
              type="number"
              placeholder="0.00"
              value={unlockPrice || ''}
              onChange={(e) => onSetUnlockPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="pl-9"
              min={0}
              step={0.01}
            />
          </div>
          <p className="text-xs text-muted-foreground">One-time purchase price for this collection</p>
        </div>
      </CardContent>
    </Card>
  );
};
