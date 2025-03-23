import { PostButtonPresentational } from "@/components/postButton/presentational";
import { useRouter } from "next/navigation";

export const PostButtonContainer = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/editor/new");
  };
  return <PostButtonPresentational handleClick={handleClick} />;
};
