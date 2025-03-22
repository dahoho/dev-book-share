import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";

import { PostList } from "@/components/postList";
import { fetchPostCountByTags, fetchPosts } from "@/service/postService";

export default async function Home() {
  const post = await fetchPosts();
  const postCountByTags = await fetchPostCountByTags();

  return (
    <LayoutContainer postCountByTags={postCountByTags}>
      <MainLayout>
        <PostList post={post} />
      </MainLayout>
    </LayoutContainer>
  );
}
