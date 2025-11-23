'use client';

import { UpdateCommentModal } from '@/components/modals/UpdateCommentModal';
import { useFan } from '@/hooks/context/UserContextWrapper';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useComments } from '@/hooks/useComments';
import { PostCommentsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { EmptyElement } from '@workspace/ui/globals/EmptyElement';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { SAvatar } from '@workspace/ui/globals/SAvatar';
import { DestroyModal } from '@workspace/ui/modals/DestroyModal';
import { TriggerModal } from '@workspace/ui/modals/TriggerModal';
import { Edit, Trash } from 'lucide-react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const CommentsStack = () => {
  const { id } = useParams();
  const { fan } = useFan();
  const { post } = usePostsStore();
  const { getPostComments, deleteComment } = useComments();
  const [updateModalOpen, setUpdateModalOpen] = useState<PostCommentsEntity | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<PostCommentsEntity | null>(null);
  const { loading, onLoadMore, postComments, hasMore, onRefresh } = getPostComments({
    take: 30,
    relatedEntityId: id as string
  });

  return (
    <InfiniteScrollManager
      dataLength={postComments.length}
      hasMore={fan ? hasMore : false}
      loading={loading}
      onLoadMore={onLoadMore}
      onRefresh={onRefresh}
    >
      <ScrollArea className="w-full">
        {postComments.length ? (
          postComments.map((comment, idx) => (
            <div key={comment.id} className="flex flex-col rounded-md border my-1 p-2 transition-all duration-150 hover:bg-muted/10">
              <div className="flex items-center justify-between space-x-2 mb-2">
                <span className="text-sm font-semibold">{comment.fanProfile.user.username}</span>
                <Badge className="text-xs font-medium bg-blue-600 text-white">{moment(comment.createdAt).format('LT L')}</Badge>
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row items-center space-x-1.5">
                    <Badge variant="secondary">{idx + 1}</Badge>
                    <SAvatar url={comment.fanProfile.user.avatarUrl} fallback="cr" />
                  </div>

                  <div className="flex flex-row space-x-1.5">
                    <TriggerModal
                      disabled={comment.fanId !== fan?.fanId}
                      applyTooltip={{ title: 'Edit' }}
                      modalIcon={{ icon: Edit, variant: 'outline' }}
                      onChangeModalState={() => setUpdateModalOpen(comment as PostCommentsEntity)}
                    />
                    <TriggerModal
                      disabled={comment.fanId !== fan?.fanId}
                      applyTooltip={{ title: 'Delete' }}
                      modalIcon={{ icon: Trash, variant: 'outline' }}
                      onChangeModalState={() => setDeleteModalOpen(comment as PostCommentsEntity)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between w-full items-center">
                  <p className="text-xs font-medium">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full justify-center items-center content-center">
            <EmptyElement />
          </div>
        )}
      </ScrollArea>

      {post && updateModalOpen && (
        <UpdateCommentModal isOpen={!!updateModalOpen} onClose={() => setUpdateModalOpen(null)} comment={updateModalOpen} />
      )}

      {post && deleteModalOpen && (
        <DestroyModal
          isOpen={!!deleteModalOpen}
          title="Remove Comment"
          description="Remove your thoughts from this post"
          subDescription="Your comment will be deleted permanently."
          onClose={() => setDeleteModalOpen(null)}
          cancelButton={{
            title: 'Cancel',
            variant: 'secondary',
            onClick: () => setDeleteModalOpen(null)
          }}
          submitButton={{
            title: 'Delete',
            destructive: true,
            onClick: () => {
              deleteComment(deleteModalOpen.id);
              setDeleteModalOpen(null);
            }
          }}
        />
      )}
    </InfiniteScrollManager>
  );
};
