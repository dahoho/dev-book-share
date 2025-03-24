import { PageTitle } from "@/components/heading/pageTitle";
import { LayoutContainer } from "@/components/layout/layout/container";
import { MainLayout } from "@/components/layout/mainLayout";
import { ProfileForm } from "@/components/profileForm";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SettingAccountPage() {
  // ユーザーのセッション情報を取得
  const user = await getCurrentUser();

  // セッションがない場合はログインページにリダイレクト
  if (!user) return redirect("/login");

  return (
    <LayoutContainer user={user}>
      <MainLayout>
        <PageTitle title="Settings" />
        <ProfileForm initialName={user.name} initialBio={user.bio} />
      </MainLayout>
    </LayoutContainer>
  );
}
