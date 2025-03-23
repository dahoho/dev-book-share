import { CommentForm } from "@/components/commentForm";
import { CommentList } from "@/components/commentList";

import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";

import { Badge } from "@/components/ui/badge";
import { DATE_FORMAT } from "@/constans";
import { getCurrentUser } from "@/lib/session";
import { fetchCommentsByPostId } from "@/service/commentService";
import { fetchPostById } from "@/service/postService";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";

import { notFound } from "next/navigation";

type PostDetailPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  const post = await fetchPostById(postId);
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // 記事が見つからなかった場合、404 ページを表示
  if (!post) notFound();

  const comments = await fetchCommentsByPostId(postId);

  return (
    <LayoutContainer>
      <MainLayout>
        {/* <Author author={post.author} /> */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className={`w-10 rounded-full`}
              src={post.author.image ?? ""}
              alt={post.author.name ?? ""}
            />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg">{post.author.name}</p>
            <time
              dateTime={dayjs(post.createdAt).format(DATE_FORMAT)}
              className="text-sm text-gray-500 block"
            >
              {dayjs(post.createdAt).format(DATE_FORMAT)}
            </time>
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-6">{post.title}</h2>
        <ul className="flex items-center gap-2 mt-4">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg mt-12 focus:outline-none"
          dangerouslySetInnerHTML={{
            __html: String(post.content ? post.content : ""),
          }}
        />
        {/* コメント一覧 */}
        <section className="mt-28">
          <h3 className="text-2xl font-bold mb-4">コメント</h3>
          {comments.length === 0 ? (
            <p className="mt-14">この記事にコメントはありません。</p>
          ) : (
            <ul className="mt-12 flex flex-col gap-12">
              {comments.map((comment) => (
                <CommentList
                  key={comment.id}
                  initialComment={comment}
                  user={user}
                  post={post}
                />
              ))}
            </ul>
          )}
          <div className="mt-20">
            <CommentForm postId={postId} />
          </div>
        </section>
      </MainLayout>
    </LayoutContainer>
  );
}
