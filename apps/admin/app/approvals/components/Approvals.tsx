import { useCreatorMutations } from '@/hooks/useCreatorMutations';
import { useCreators } from '@/hooks/useCreators';
import { CreatorApprovalStatus, SortBy } from '@workspace/gql/generated/graphql';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@workspace/ui/components/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { MEOW_FANS_AVATAR } from '@workspace/ui/lib/constants';
import { cn } from '@workspace/ui/lib/utils';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

interface VerificationAnswers {
  fullName: string;
  socialMedia: string;
  contentCategory: string;
  foundVia: string;
  motivation: string;
  videoUrl: string;
}

export const Approvals = () => {
  const { updateCreatorApprovalStatus, loading: mutationLoading } = useCreatorMutations();
  const [status, setStatus] = useState<CreatorApprovalStatus>(CreatorApprovalStatus.Requested);
  const { creators, hasMore, handlLoadMore, loading } = useCreators({
    sortBy: SortBy.UserCreatedAt,
    creatorApprovalStatus: status
  });

  const [selectedCreator, setSelectedCreator] = useState<(typeof creators)[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as CreatorApprovalStatus);
  };

  const handleOpenDetails = (creator: (typeof creators)[0]) => {
    setSelectedCreator(creator);
    setIsSheetOpen(true);
  };

  const handleUpdateStatus = async (newStatus: CreatorApprovalStatus) => {
    if (!selectedCreator) return;
    const updatedStatus = await updateCreatorApprovalStatus({
      creatorId: selectedCreator.id,
      status: newStatus
    });
    if (updatedStatus) {
      creators.filter((c) => c.id !== selectedCreator.id);
    }
    setIsSheetOpen(false);
  };

  const getStatusBadgeVariant = (s: CreatorApprovalStatus) => {
    switch (s) {
      case CreatorApprovalStatus.Accepted:
        return 'default'; // or a success variant if available
      case CreatorApprovalStatus.Rejected:
        return 'destructive';
      case CreatorApprovalStatus.Requested:
        return 'secondary';
      case CreatorApprovalStatus.Review:
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const answers = selectedCreator?.creatorProfile?.verification?.answers as unknown as VerificationAnswers | undefined;

  return (
    <PageManager className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold tracking-tight">Creator Approvals</h2>
        <Tabs value={status} onValueChange={handleStatusChange} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={CreatorApprovalStatus.Requested}>Requested</TabsTrigger>
            <TabsTrigger value={CreatorApprovalStatus.Review}>Review</TabsTrigger>
            <TabsTrigger value={CreatorApprovalStatus.Accepted}>Accepted</TabsTrigger>
            <TabsTrigger value={CreatorApprovalStatus.Rejected}>Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <InfiniteScrollManager
        dataLength={creators.length}
        loading={loading}
        onLoadMore={handlLoadMore}
        hasMore={hasMore}
        scrollableDiv="admin-main-scroll"
      >
        <Card className="border-0 shadow-none bg-transparent">
          <Table>
            <TableHeader className="bg-muted/50 z-30 backdrop-blur-sm">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="sticky left-0 top-0 z-40 bg-card min-w-[200px]">User</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card">Status</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card">Score</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card">Submitted At</TableHead>
                <TableHead className="sticky top-0 z-30 bg-card text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No creators found with status {status}.
                  </TableCell>
                </TableRow>
              )}
              {creators.map((creator) => (
                <TableRow
                  key={creator.id}
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleOpenDetails(creator)}
                >
                  <TableCell className="sticky left-0 bg-card z-10 font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={creator.avatarUrl ?? MEOW_FANS_AVATAR} className="object-cover" />
                        <AvatarFallback>{creator.username?.[0] || '?'}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{creator.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {creator.firstName} {creator.lastName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(creator.creatorProfile.status)} className="capitalize">
                      {creator.creatorProfile.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'font-bold',
                          (creator.creatorProfile.verification?.score || 0) > 50 ? 'text-green-500' : 'text-amber-500'
                        )}
                      >
                        {creator.creatorProfile.verification?.score ?? 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {creator.creatorProfile.verification?.createdAt
                      ? format(new Date(creator.creatorProfile.verification.createdAt), 'PPP')
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetails(creator);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </InfiniteScrollManager>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col h-full p-0 gap-0">
          <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-background z-20">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src={selectedCreator?.avatarUrl ?? MEOW_FANS_AVATAR} className="object-cover" />
                <AvatarFallback>{selectedCreator?.username?.[0] || '?'}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl">Application Details</SheetTitle>
                <SheetDescription>Reviewing {selectedCreator?.username}'s application</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6 py-6">
            <div className="space-y-8 pb-10">
              {/* Status & Score */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge
                      variant={getStatusBadgeVariant(selectedCreator?.creatorProfile.status as CreatorApprovalStatus)}
                      className="text-base px-3 py-1"
                    >
                      {selectedCreator?.creatorProfile.status}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Verification Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedCreator?.creatorProfile.verification?.score ?? 'N/A'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Video Application */}
              {answers?.videoUrl && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold border-b pb-2">Introduction Video</h3>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/5 ring-1 ring-border">
                    <video src={answers.videoUrl} controls className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              {/* Q&A Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold border-b pb-2">Application Answers</h3>
                <div className="grid gap-6">
                  <div className="grid gap-1.5">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Full Name</span>
                    <p className="text-base font-medium">{answers?.fullName || 'N/A'}</p>
                  </div>
                  <div className="grid gap-1.5">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Social Media</span>
                    <a
                      href={answers?.socialMedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-primary hover:underline break-all"
                    >
                      {answers?.socialMedia || 'N/A'}
                    </a>
                  </div>
                  <div className="grid gap-1.5">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Content Category</span>
                    <p className="text-base font-medium">{answers?.contentCategory || 'N/A'}</p>
                  </div>
                  <div className="grid gap-1.5">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Motivation</span>
                    <p className="text-base leading-relaxed bg-muted/30 p-3 rounded-md">{answers?.motivation || 'N/A'}</p>
                  </div>
                  <div className="grid gap-1.5">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Found Via</span>
                    <p className="text-base font-medium">{answers?.foundVia || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <SheetFooter className="px-6 py-4 border-t bg-background sticky bottom-0 z-20 flex sm:justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground">
              Applied on:{' '}
              {selectedCreator?.creatorProfile.verification?.createdAt
                ? format(new Date(selectedCreator.creatorProfile.verification.createdAt), 'PPP p')
                : 'Unknown'}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {(status === CreatorApprovalStatus.Review || status === CreatorApprovalStatus.Requested) && (
                <>
                  <Button
                    variant="destructive"
                    className="flex-1 sm:flex-none"
                    onClick={() => handleUpdateStatus(CreatorApprovalStatus.Rejected)}
                    disabled={mutationLoading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1 sm:flex-none"
                    onClick={() => handleUpdateStatus(CreatorApprovalStatus.Accepted)}
                    disabled={mutationLoading}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </PageManager>
  );
};
