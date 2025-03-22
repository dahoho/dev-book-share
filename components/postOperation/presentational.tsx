import { EllipsisVertical, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PostOperationPresentationalType = {
  postId: string;
  deletePost: (postId: string) => void;
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  isDeleteLoading: boolean;
  setIsDeleteLoading: Dispatch<SetStateAction<boolean>>;
};

export const PostOperationPresentational = ({
  postId,
  showDialog,
  setShowDialog,
  deletePost,
  isDeleteLoading,
  setIsDeleteLoading,
}: PostOperationPresentationalType) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-5 h-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor/${postId}`} className="block w-full">
              <span>編集</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() => setShowDialog(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当にこの記事を削除しますか?</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive-dark cursor-pointer"
              onClick={() => {
                setIsDeleteLoading(true);
                deletePost(postId);
              }}
            >
              {isDeleteLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
