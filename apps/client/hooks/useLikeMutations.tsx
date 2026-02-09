import { useLikesStore } from '@/hooks/store/likes.store';
import { usePostsStore } from '@/hooks/store/posts.store';
import { useVaultsStore } from '@/hooks/store/vaults.store';
import { useLikesActions } from '@workspace/gql/actions/likes.actions';
import { GetLikedPostsOutput, GetLikedVaultObjectsOutput, GetLikedVaultsOutput } from '@workspace/gql/generated/graphql';
import { useErrorHandler } from '@workspace/ui/hooks/useErrorHandler';
import { toast } from 'sonner';

export function useLikeMutations() {
  const { errorHandler } = useErrorHandler();
  const { posts, setPosts, setPost } = usePostsStore();
  const { vaults, setVaults, vaultObjects, setVaultObjects, setVault } = useVaultsStore();
  const { likePostMutation, likeVaultMutation, likeVaultObjectMutation } = useLikesActions();
  const { vaultLikes, setVaultLikes, vaultObjectLikes, setVaultObjectLikes, postLikes, setPostLikes } = useLikesStore();

  const likeVault = async (vaultId: string) => {
    if (!vaultId) return;
    try {
      const { data } = await likeVaultMutation({ relatedEntityId: vaultId });
      const isLiked = data?.likeVault as GetLikedVaultsOutput;

      setVaultLikes(isLiked ? [isLiked, ...vaultLikes] : vaultLikes.filter((v) => v.id !== vaultId));
      setVaults(vaults.map((v) => (v.id === vaultId ? { ...v, isLiked: !!isLiked } : v)));
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

      setVaultObjectLikes(isLiked ? [isLiked, ...vaultObjectLikes] : vaultObjectLikes.filter((v) => v.id !== id));

      setVaultObjects(vaultObjects.map((v) => (v.id === id ? { ...v, isLiked: !!isLiked } : v)));

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

      setPostLikes(isLiked ? [isLiked, ...postLikes] : postLikes.filter((p) => p.id !== postId));
      setPosts(posts.map((p) => (p.id === postId ? { ...p, isLiked: !!isLiked } : p)));
      setPost((prev) => (prev?.id === postId ? { ...prev, isLiked: !!isLiked } : prev));

      toast[isLiked ? 'success' : 'warning'](isLiked ? 'Post is saved ❤️' : 'Post is removed 💔');
      return isLiked;
    } catch (error) {
      errorHandler({ error });
    }
  };

  return { likeVault, likeVaultObject, likePost };
}
