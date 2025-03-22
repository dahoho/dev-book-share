"use client";

import { usePathname } from "next/navigation";

import { categoryState } from "@/lib/atoms/state";
import { useAtom } from "jotai";
import { SideBarPresentational } from "@/components/layout/sideBar/presentational";

type SideBarContainerType = {
  postCountByTags?: Record<string, number>;
};

export const SideBarContainer = ({ postCountByTags }: SideBarContainerType) => {
  const pathname = usePathname();
  const [category, setCategory] = useAtom(categoryState);
  return (
    <SideBarPresentational
      pathname={pathname}
      category={category}
      setCategory={setCategory}
      postCountByTags={postCountByTags}
    />
  );
};
