"use client";

import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

import { GithubIcon, GoogleIcon } from "@/components/icon";
import { LoginButton } from "@/components/loginButton";

type InputsType = {
  email: string;
};

type LoginFormPresentationalPropsType = {
  isGithubLoading: boolean;
  isGoogleLoading: boolean;
  setIsGithubLoading: (value: boolean) => void;
  setIsGoogleLoading: (value: boolean) => void;
  handleGitHubSignIn: () => void;
  handleGoogleSignIn: () => void;
  onSubmit: SubmitHandler<InputsType>;
  handleSubmit: UseFormHandleSubmit<InputsType, undefined>;
};

export const LoginFormPresentational = ({
  isGithubLoading,
  isGoogleLoading,
  setIsGithubLoading,
  setIsGoogleLoading,
  handleGitHubSignIn,
  handleGoogleSignIn,
  onSubmit,
  handleSubmit,
}: LoginFormPresentationalPropsType) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5"
    >
      <div className="bg-white shadow-lg rounded-lg md:max-w-md mx-auto p-8 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>
        <div className="flex flex-col gap-4">
          <LoginButton
            text="GitHub"
            isLoading={isGithubLoading}
            onClick={() => {
              setIsGithubLoading(true);
              handleGitHubSignIn();
            }}
            icon={<GithubIcon size="24" />}
          />
          <LoginButton
            text="Google"
            isLoading={isGoogleLoading}
            onClick={() => {
              setIsGoogleLoading(true);
              handleGoogleSignIn();
            }}
            icon={<GoogleIcon size="24" />}
          />
        </div>
      </div>
    </form>
  );
};
