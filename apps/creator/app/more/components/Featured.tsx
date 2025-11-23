import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Feature } from './More';

interface Props {
  features: Feature[];
}

export const Featured: React.FC<Props> = ({ features }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Featured</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <motion.div
              key={f.id}
              whileHover={{ y: -4 }}
              className={`p-4 rounded-xl border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm flex flex-col gap-2`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted/10 text-muted-foreground">{f.icon}</div>
                  <div>
                    <h3 className="text-sm font-medium">{f.title}</h3>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
                {f.featured && (
                  <div className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold">
                    <Check size={14} /> Featured
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4 py-3">
        <div className="text-sm text-muted-foreground">Want more? Explore Labs.</div>
        <Button variant="ghost">Open Labs</Button>
      </CardFooter>
    </Card>
  );
};
