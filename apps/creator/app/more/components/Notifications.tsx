import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Switch } from '@workspace/ui/components/switch';

export const Notifications = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">Email notifications</h4>
            <p className="text-xs text-muted-foreground">Receive updates via email.</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">Push notifications</h4>
            <p className="text-xs text-muted-foreground">Browser & mobile push alerts.</p>
          </div>
          <Switch />
        </div>

        <div className="md:col-span-2">
          <Label>Digest frequency</Label>
          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
