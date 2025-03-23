import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

type ProfileFormProps = {
  name: string;
  bio: string;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSaving: boolean;
};

export const ProfileFormPresentational = ({
  name,
  bio,
  setName,
  setBio,
  handleSubmit,
  isSaving,
}: ProfileFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="mt-14">
      <h2 className="text-2xl font-bold">プロフィール</h2>
      <div className="mt-8">
        <label className="flex flex-col">
          <span className="font-bold">名前</span>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent py-2 px-4 border border-gray-300 mt-2"
          />
        </label>
        <label className="flex flex-col mt-12">
          <span className="font-bold">自己紹介</span>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className=" p-2 mt-2 border border-gray-300 resize-none h-28"
          />
        </label>
        <p className="mt-4 text-sm">
          プロフィールにこれらの情報が表示されます。
        </p>
        <Button type="submit" className="cursor-pointer mt-8">
          {isSaving && <Loader2 className="animate-spin" />}
          更新する
        </Button>
      </div>
    </form>
  );
};
