import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Check, Crown, ImageIcon } from 'lucide-react';

interface Props {
  banner: string | null;
  planName: string;
  features: string[];
  featured: boolean;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const PlanPreview: React.FC<Props> = ({
  planName,
  features,
  description,
  featured,
  monthlyPrice,
  yearlyPrice,
  banner,
  setActiveTab
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <Card className={`relative overflow-hidden ${featured ? 'ring-2 ring-indigo-400' : ''}`}>
        {featured && (
          <div className="absolute top-1 right-1">
            <div className="flex items-center gap-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
              <Crown className="w-4 h-4" />
              <span>Popular</span>
            </div>
          </div>
        )}
        {banner ? (
          <div>
            <div className="-top-1 -right-1">
              <Button variant="outline" onClick={() => setActiveTab('preview')} className="">
                Edit
              </Button>
            </div>
            <div style={{ backgroundImage: `url(${banner})` }} className="h-60 w-full bg-cover bg-center" />
          </div>
        ) : (
          <Card className="border-dashed h-60">
            <ImageIcon className="align-middle justify-center m-auto w-50 h-50" />
          </Card>
        )}
        <CardHeader className="">
          <CardTitle className="text-lg">{planName || 'Plan Name'}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{description || 'Plan description goes here.'}</p>
          <div className="text-2xl font-bold mt-2">${monthlyPrice}/mo</div>
          <div className="text-xs text-muted-foreground">or ${yearlyPrice}/yr</div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <ul className="space-y-2">
            {features.length > 0 ? (
              features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 mt-1" /> {f}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No features added</li>
            )}
          </ul>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full">Choose {planName || 'Plan'}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
