"use client";

import { MEOW_FANS_BANNER } from "@workspace/ui/lib/constants";
import { ButtonSize, ButtonVariant, handleFullScreen } from "@workspace/ui/lib";
import { Fullscreen } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@workspace/ui/components/button";

export interface FullScreenButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentUrl?: string;
  currentIdx: number;
  urls: string[];
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const FullScreenButton: React.FC<FullScreenButtonProps> = ({
  currentIdx,
  currentUrl = MEOW_FANS_BANNER,
  urls,
  className = "hover:text-red-500 rounded-xl hidden md:flex",
  size = "icon",
  variant = "default",
  title = "Full Screen",
  ...props
}) => {
  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      title={title}
      onClick={() =>
        handleFullScreen(
          currentUrl,
          currentIdx,
          urls.filter((url): url is string => !!url)
        )
      }
      {...props}
    >
      <Fullscreen />
    </Button>
  );
};
