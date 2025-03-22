import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const PostButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/editor/new");
  };

  return (
    <Button
      onClick={handleClick}
      className="cursor-pointer font-bold md:px-6 px-4 text-xs md:text-sm bg-primary text-white rounded-md py-1.5"
    >
      投稿する
    </Button>
  );
};
