"use client";

import { HeaderPresentational } from "@/components/layout/header/presentational";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

type HeaderPresentationalPropsType = {
  user?: User;
};

export const HeaderContainer = ({ user }: HeaderPresentationalPropsType) => {
  const pathname = usePathname();
  const isEditorPage = pathname.startsWith("/editor");

  return <HeaderPresentational user={user} isEditorPage={isEditorPage} />;
};
