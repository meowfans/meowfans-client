"use client";

import { cn } from "@workspace/ui/lib/utils";
import { ButtonSize, ButtonVariant } from "@workspace/ui/lib/types";
import { Loader, LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@workspace/ui/components/button";

export interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  Icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  destructive?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  size = "default",
  title = "",
  variant,
  loading = false,
  Icon,
  disabled = false,
  className = "",
  destructive = false,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
      className={(cn(className), destructive ? "bg-red-500" : "")}
    >
      {loading && <Loader className={"animate-spin"} />}
      {Icon && !loading && <Icon />}
      {title}
    </Button>
  );
};
