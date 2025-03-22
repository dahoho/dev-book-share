import { PostList } from "@/components/postList";
import { Post } from "@prisma/client";

type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type ProfilePostContainerType = {
  post: PostWithAuthor[];
};

export const ProfilePost = ({ post }: ProfilePostContainerType) => {
  return (
    <section className="mt-22">
      <h2 className="text-3xl font-bold">記事一覧</h2>
      <div className="mt-14">
        <PostList post={post} />
      </div>
    </section>
  );
};
