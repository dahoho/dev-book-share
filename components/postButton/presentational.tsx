import { Button } from "@/components/ui/button";

type PostButtonPresentationalPropsType = {
  handleClick: () => void;
};

export const PostButtonPresentational = ({
  handleClick,
}: PostButtonPresentationalPropsType) => {
  return (
    <Button
      onClick={handleClick}
      className="cursor-pointer font-bold md:px-6 px-4 text-xs md:text-sm bg-primary text-white rounded-md py-1.5"
    >
      投稿する
    </Button>
  );
};
