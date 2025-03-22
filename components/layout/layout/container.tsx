import { ChildrenType } from "@/type/children";
import { getCurrentUser } from "@/lib/session";

import { redirect } from "next/navigation";
import { User } from "next-auth";
import { LayoutPresentational } from "@/components/layout/layout/presentational";

type HeaderPresentationalPropsType = {
  user?: User;
  postCountByTags?: Record<string, number>;
} & ChildrenType;

export const LayoutContainer = async ({
  children,
  postCountByTags,
}: HeaderPresentationalPropsType) => {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // セッションがない場合はログインページにリダイレクト
  if (!user) return redirect("/login");

  return (
    <LayoutPresentational user={user} postCountByTags={postCountByTags}>
      {children}
    </LayoutPresentational>
  );
};
