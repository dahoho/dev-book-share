import { EditorOperation } from "@/components/editorOperation";
import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { fetchPostById } from "@/service/postService";

type EditorPagePropsType = {
  params: Promise<{ postId: string }>;
};

export default async function EditorPage({ params }: EditorPagePropsType) {
  const { postId } = await params;
  const post = await fetchPostById(postId);

  return (
    <LayoutContainer>
      <MainLayout>
        <EditorOperation post={post} postId={postId} />
      </MainLayout>
    </LayoutContainer>
  );
}
