import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, NotebookPen, Settings, User as UserIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

type UserDropdownMenuPropsType = {
  user?: User;
};

export const UserDropdownMenu = ({ user }: UserDropdownMenuPropsType) => {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={`/profile/${user.name}`}
            className="cursor-pointer flex items-center"
          >
            <UserIcon />
            <span>プロフィール</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard`}
            className="cursor-pointer flex items-center"
          >
            <NotebookPen />
            <span>記事の管理</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href={`/setting/account`}
            className="cursor-pointer flex items-center"
          >
            <Settings />
            <span>アカウント設定</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: `/login` })}
          className="cursor-pointer"
        >
          <LogOut />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
