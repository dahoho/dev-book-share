import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type AuthorPropsType = {
  author: {
    name: string | null;
    image: string | null;
  };
  avatarSize?: "md" | "lg";
  textSize?: "md" | "lg";
  children?: React.ReactNode;
};

export const Author = ({
  author,
  avatarSize = "md",
  textSize = "md",
  children,
}: AuthorPropsType) => {
  const avatarSizeClasses = {
    md: "w-8",
    lg: "w-24",
  };

  const textSizeClasses = {
    md: "text-sm",
    lg: "text-xl font-bold",
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          className={`${avatarSizeClasses[avatarSize]} w-8 rounded-full`}
          src={author.image ?? ""}
          alt={author.name ?? ""}
        />
      </Avatar>
      <div>
        <p className={`${textSizeClasses[textSize]}`}>{author.name}</p>
        {children}
      </div>
    </div>
  );
};
