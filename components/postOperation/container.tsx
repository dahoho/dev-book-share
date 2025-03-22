import { PostOperationPresentational } from "@/components/postOperation/presentational";
import { useDeletePost } from "@/hooks/useDeletePost";

type PostOperationContainerType = {
  postId: string;
};

export const PostOperationContainer = ({
  postId,
}: PostOperationContainerType) => {
  const {
    deletePost,
    showDialog,
    setShowDialog,
    isDeleteLoading,
    setIsDeleteLoading,
  } = useDeletePost();
  return (
    <PostOperationPresentational
      postId={postId}
      deletePost={deletePost}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      isDeleteLoading={isDeleteLoading}
      setIsDeleteLoading={setIsDeleteLoading}
    />
  );
};
