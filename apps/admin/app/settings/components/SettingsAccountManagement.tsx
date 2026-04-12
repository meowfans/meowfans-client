import useAPI from '@/hooks/useAPI';
import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SettingsAccountManageMent = () => {
 const router = useRouter();
 const { logout } = useAPI();
 const { deleteAccount, loading } = useCreatorMutations();
 const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

 const handleLogout = () => {
 logout();
 router.refresh();
 };

 const handleDeleteAccount = async () => {
 await deleteAccount();
 handleLogout();
 setShowDeleteConfirm(false);
 };

 return (
 <div className="space-y-8">
  <header className="space-y-1">
  <h2 className="text-3xl font-black uppercase tracking-tight">Account Management</h2>
  <p className="text-muted-foreground font-medium text-sm">Manage your account settings and data.</p>
  </header>

  <Card className="border-none bg-destructive/5 p-8 rounded-4xl ring-1 ring-destructive/20 space-y-6">
  <div className="flex items-start gap-4">
   <div className="h-12 w-12 rounded-2xl bg-destructive/10 flex items-center justify-center shrink-0">
   <AlertTriangle className="h-6 w-6 text-destructive"/>
   </div>
   <div className="flex-1 space-y-2">
   <h4 className="font-bold uppercase tracking-tight flex items-center gap-2 text-sm text-destructive">Danger Zone</h4>
   <p className="text-sm text-muted-foreground font-medium">
    Deleting your account is permanent and cannot be undone. All your content, followers, and data will be permanently removed.
   </p>
   </div>
  </div>

  {!showDeleteConfirm ? (
   <Button
   onClick={() => setShowDeleteConfirm(true)}
   variant="destructive"
   className="h-14 px-8 rounded-full font-black uppercase tracking-widest gap-3 shadow-lg shadow-destructive/20"
   >
   <Trash2 className="h-5 w-5"/>
   Delete Account
   </Button>
  ) : (
   <div className="space-y-4 p-6 rounded-2xl bg-destructive/10 border-2 border-destructive/20">
   <p className="font-bold uppercase text-sm text-destructive flex items-center gap-2">
    <AlertTriangle className="h-4 w-4"/>
    Are you absolutely sure?
   </p>
   <p className="text-xs text-muted-foreground font-medium">
    This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
   </p>
   <div className="flex gap-3">
    <Button
    onClick={handleDeleteAccount}
    disabled={loading}
    variant="destructive"
    className="h-12 px-6 rounded-full font-black uppercase tracking-widest text-xs gap-2"
    >
    {loading ? 'Deleting...' : 'Yes, Delete Forever'}
    </Button>
    <Button
    onClick={() => setShowDeleteConfirm(false)}
    variant="outline"
    className="h-12 px-6 rounded-full font-bold uppercase tracking-widest text-xs"
    >
    Cancel
    </Button>
   </div>
   </div>
  )}
  </Card>
 </div>
 );
};
