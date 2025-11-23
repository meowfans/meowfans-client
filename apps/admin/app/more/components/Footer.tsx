import { Button } from '@workspace/ui/components/button';

export const Footer = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-muted-foreground">Changes are saved locally. Use the buttons to export or reset your settings.</div>
      <div className="flex gap-2">
        <Button variant="outline">Export</Button>
        <Button>Save all</Button>
      </div>
    </div>
  );
};
