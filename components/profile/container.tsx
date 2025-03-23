import { ProfilePresentational } from "@/components/profile/presentational";
import { User } from "next-auth";

type ProfileContainerPropsType = {
  user?: User;
  totalLikes: number;
};

export const ProfileContainer = ({
  user,
  totalLikes,
}: ProfileContainerPropsType) => {
  if (!user) return null;

  return (
    <ProfilePresentational
      userImage={user.image ?? ""}
      userName={user.name ?? ""}
      userBio={user.bio ?? ""}
      totalLikes={totalLikes}
    />
  );
};
