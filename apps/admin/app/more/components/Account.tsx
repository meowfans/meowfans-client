import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';

export const Account = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Username</Label>
          <Input placeholder="Your username" />
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label>Bio</Label>
          <textarea
            className="w-full rounded-md border p-2 h-28 dark:bg-slate-900 dark:border-slate-700"
            placeholder="Something about you..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-3">
        <Button variant="ghost">Discard</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
