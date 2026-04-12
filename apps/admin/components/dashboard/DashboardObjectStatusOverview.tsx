import { useGetAllObjectsCount } from '@/hooks/useVaults';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ApplyShadCnChart } from '@workspace/ui/globals/ApplyShadCnChart';
import { ShadCnChartTypes } from '@workspace/ui/lib/enums';
import { BarChart3, CheckCircle2, Clock, Loader2, ShieldCheck, XCircle } from 'lucide-react';
import { useEffect } from 'react';

export const DashboardObjectStatusOverview = () => {
 const { loading, fetchCounts, objectsCount } = useGetAllObjectsCount();

 useEffect(() => {
 fetchCounts();
 }, []); // eslint-disable-line

 const stats = [
 {
  title: 'Pending Objects',
  value: objectsCount.pending,
  icon: Clock,
  color: 'text-amber-500',
  description: 'Waiting for processing'
 },
 {
  title: 'Processing Objects',
  value: objectsCount.processing,
  icon: ShieldCheck,
  color: 'text-blue-500',
  description: 'Currently being processed'
 },
 {
  title: 'Fulfilled Objects',
  value: objectsCount.fulfilled,
  icon: CheckCircle2,
  color: 'text-green-500',
  description: 'Successfully processed'
 },
 {
  title: 'Rejected Objects',
  value: objectsCount.rejected,
  icon: XCircle,
  color: 'text-destructive',
  description: 'Failed or rejected'
 }
 ];

 return (
 <Card className="lg:col-span-3">
  <CardHeader>
  <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight flex items-center gap-2">
   <BarChart3 className="h-5 w-5 text-primary"/>
   Object Status Overview
  </CardTitle>
  </CardHeader>
  <CardContent className="h-[250px] flex items-center justify-center">
  {loading ? (
   <Loader2 className="h-8 w-8 animate-spin text-primary/20"/>
  ) : (
   <ApplyShadCnChart
   chartType={ShadCnChartTypes.BAR_CHART}
   dataTable={[
    { status: 'Pending', count: objectsCount.pending },
    { status: 'Active', count: objectsCount.processing },
    { status: 'Done', count: objectsCount.fulfilled },
    { status: 'Failed', count: objectsCount.rejected }
   ]}
   xDataKey="status"
   yDataKey="count"
   XDataLabel="Status"
   yDataLabel="Objects"
   />
  )}
  </CardContent>
 </Card>
 );
};
