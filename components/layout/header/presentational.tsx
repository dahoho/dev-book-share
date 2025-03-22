import { PostButton } from "@/components/postButton";
import { UserDropdownMenu } from "@/components/userDropdownMenu";

import { User } from "next-auth";
import Link from "next/link";

type HeaderPresentationalPropsType = {
  user?: User;
  isEditorPage: boolean;
};

export const HeaderPresentational = ({
  user,
  isEditorPage,
}: HeaderPresentationalPropsType) => {
  return (
    <header className="h-14 flex items-center justify-between px-5 border-b border-gray-300">
      <h1 className="md:text-xl font-bold">
        <Link href="/" className="flex items-center gap-2">
          Dev Book Share
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        {/* <Search className="md:w-6 w-5 cursor-pointer" />
        <Bell className="md:w-6 w-5 cursor-pointer" /> */}
        <UserDropdownMenu user={user} />
        {!isEditorPage && <PostButton />}
      </div>
    </header>
  );
};
