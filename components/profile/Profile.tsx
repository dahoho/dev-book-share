import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "next-auth";

type ProfilePropsType = {
  user?: User;
  totalLikes: number;
};

export const Profile = ({ user, totalLikes }: ProfilePropsType) => {
  if (!user) return null;

  return (
    <section>
      <h2 className="text-3xl font-bold">プロフィール</h2>
      <div className="flex gap-6 mt-14">
        <Avatar>
          <AvatarImage
            className={`w-24 rounded-full`}
            src={user.image ?? ""}
            alt={user.name ?? ""}
          />
        </Avatar>
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="mt-4 leading-4">
            {user.bio
              ? user.bio
              : "自己紹介文はまだ設定されていません。アカウント設定から設定してください。"}
          </p>
          <div className="flex items-end font-bold gap-1 mt-4">
            <p>{totalLikes}</p>
            <p className="">Likes</p>
          </div>
        </div>
      </div>
    </section>
  );
};
