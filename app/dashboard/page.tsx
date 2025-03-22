import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";

import { PostList } from "@/components/postList";
import { getCurrentUser } from "@/lib/session";
import { fetchPosts } from "@/service/postService";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // セッションがない場合はログインページにリダイレクト
  if (!user) return redirect("/login");

  // ユーザーに紐づく投稿を取得
  const post = await fetchPosts(user.id);

  return (
    <LayoutContainer user={user}>
      <MainLayout>
        <h2 className="text-3xl font-bold">記事の管理</h2>
        <div className="mt-12">
          <PostList post={post} />
        </div>
      </MainLayout>
    </LayoutContainer>
  );
}
