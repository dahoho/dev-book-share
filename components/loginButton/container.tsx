"use client";

import { LoginButtonPresentational } from "@/components/loginButton/presentational";
import { JSX } from "react";

type LoginButtonContainerPropsType = {
  text: string;
  isLoading: boolean;
  onClick: () => void;
  icon: JSX.Element;
};

export const LoginButtonContainer = ({
  text,
  onClick,
  isLoading,
  icon,
}: LoginButtonContainerPropsType) => {
  return (
    <LoginButtonPresentational
      text={text}
      isLoading={isLoading}
      onClick={onClick}
      icon={icon}
    />
  );
};
