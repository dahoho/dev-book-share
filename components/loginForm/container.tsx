"use client";

import { LoginFormPresentational } from "@/components/loginForm/presentational";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputsType = {
  email: string;
};

export const LoginFormContainer = () => {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async (data: InputsType) => {
    await signIn("email", {
      email: data.email,
      callbackUrl: `/`,
    });
  };

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: `/` });
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: `/` });
  };
  return (
    <LoginFormPresentational
      isGithubLoading={isGithubLoading}
      isGoogleLoading={isGoogleLoading}
      setIsGithubLoading={setIsGithubLoading}
      setIsGoogleLoading={setIsGoogleLoading}
      handleGitHubSignIn={handleGitHubSignIn}
      handleGoogleSignIn={handleGoogleSignIn}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      register={register}
    />
  );
};
