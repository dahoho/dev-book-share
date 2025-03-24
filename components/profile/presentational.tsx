import { PageTitle } from "@/components/heading/pageTitle";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type ProfilePresentationalPropsType = {
  userImage: string;
  userName: string;
  userBio: string;
  totalLikes: number;
};

export const ProfilePresentational = ({
  userImage,
  userName,
  userBio,
  totalLikes,
}: ProfilePresentationalPropsType) => {
  return (
    <section>
      <PageTitle title="プロフィール" />
      <div className="flex gap-6 mt-14">
        <Avatar>
          <AvatarImage
            className={`w-24 rounded-full`}
            src={userImage}
            alt={userName}
          />
        </Avatar>
        <div>
          <p className="text-xl font-bold">{userName}</p>
          <p className="mt-4 leading-4">
            {userBio
              ? userBio
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
