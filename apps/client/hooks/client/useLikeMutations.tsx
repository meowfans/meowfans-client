import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { GetLikedPostsOutput, GetLikedVaultObjectsOutput, GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { toast } from 'sonner';
import { useLikesStore } from '../store/likes.store';
import { usePostsStore } from '../store/posts.store';
import { useVaultsStore } from '../store/vaults.store';

export function useLikeMutations() {
  const { errorHandler } = useErrorHandler();
  const { setPosts, setPost } = usePostsStore();
  const { setVaults, setVaultObjects, setVault } = useVaultsStore();
  const { likePostMutation, likeVaultMutation, likeVaultObjectMutation } = useLikesActions();
  const { setVaultLikes, setVaultObjectLikes, setPostLikes } = useLikesStore();

  const likeVault = async (vaultId: string) => {
    if (!vaultId) return;
    try {
      const { data } = await likeVaultMutation({ relatedEntityId: vaultId });
      const isLiked = data?.likeVault as GetLikedVaultsOutput;

      setVaultLikes((prev) => (isLiked ? [isLiked, ...prev] : prev.filter((v) => v.id !== vaultId)));
      setVaults((prev) => prev.map((v) => (v.id === vaultId ? { ...v, isLiked: !!isLiked } : v)));
      setVault((prev) => (prev?.id === vaultId ? { ...prev, isLiked: !!isLiked } : prev));

      toast[isLiked ? 'success' : 'warning'](isLiked ? 'The album is saved ❤️' : 'The album is removed 💔');
      return isLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  const likeVaultObject = async (id: string) => {
    if (!id) return;

    try {
      const { data } = await likeVaultObjectMutation({ relatedEntityId: id });
      const isLiked = data?.likeVaultObject as GetLikedVaultObjectsOutput;

      setVaultObjectLikes((prev) => (isLiked ? [isLiked, ...prev] : prev.filter((v) => v.id !== id)));

      setVaultObjects((prev) => prev.map((v) => (v.id === id ? { ...v, isLiked: !!isLiked } : v)));

      toast[isLiked ? 'success' : 'warning'](isLiked ? 'Post is saved ❤️' : 'Post is removed 💔');
      return isLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  const likePost = async (postId: string) => {
    if (!postId) return;

    try {
      const { data } = await likePostMutation({ postId });
      const isLiked = data?.likePost as GetLikedPostsOutput;

      setPostLikes((prev) => (isLiked ? [isLiked, ...prev] : prev.filter((p) => p.id !== postId)));
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, isLiked: !!isLiked } : p)));
      setPost((prev) => (prev?.id === postId ? { ...prev, isLiked: !!isLiked } : prev));

      toast[isLiked ? 'success' : 'warning'](isLiked ? 'Post is saved ❤️' : 'Post is removed 💔');
      return isLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  return { likeVault, likeVaultObject, likePost };
}
