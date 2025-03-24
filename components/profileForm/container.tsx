"use client";

import { ProfileFormPresentational } from "@/components/profileForm/presentational";
import { useState } from "react";
import { toast } from "sonner";

type ProfileFormContainerPropsType = {
  initialName?: string | null;
  initialBio?: string | null;
};

export const ProfileFormContainer = ({
  initialName,
  initialBio,
}: ProfileFormContainerPropsType) => {
  const [name, setName] = useState<string>(initialName || "");
  const [bio, setBio] = useState<string>(initialBio || "");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, bio }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description:
          "プロフィールが更新されませんでした。もう一度お試しください。",
      });
    }

    toast.success("success", {
      description: "プロフィールが更新されました。",
    });
  };

  return (
    <ProfileFormPresentational
      name={name}
      bio={bio}
      setName={setName}
      setBio={setBio}
      handleSubmit={handleSubmit}
      isSaving={isSaving}
    />
  );
};
