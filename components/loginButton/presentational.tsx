"use client";

import { JSX } from "react";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type LoginButtonPresentationalPropsType = {
  text: string;
  isLoading: boolean;
  onClick: () => void;
  icon: JSX.Element;
};

export const LoginButtonPresentational = ({
  text,
  isLoading,
  onClick,
  icon,
}: LoginButtonPresentationalPropsType) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className="cursor-pointer"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : icon}
      {text}
    </Button>
  );
};
