"use client";

import { ButtonSize, ButtonVariant } from "@workspace/ui/lib/types";
import { Component, LucideIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

interface Props {
  children: React.ReactNode;
  content: string;
}

export const ApplyTooltip: React.FC<Props> = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface TootTipProps {
  onClick?: () => unknown;
  buttonProps?: {
    icon: LucideIcon;
    size?: ButtonSize;
    variant?: ButtonVariant;
    buttonText?: string;
  };
  tootTipTitle: string;
  className?: string;
  disabled?: boolean;
}

export const ApplyButtonTooltip: React.FC<TootTipProps> = ({
  onClick,
  buttonProps = {
    icon: Component,
    size: "default",
    variant: "default",
    buttonText: "",
  },
  tootTipTitle,
  className = "",
  disabled = false,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={buttonProps.variant}
          onClick={onClick}
          disabled={disabled}
          size={buttonProps.size}
          className={className}
        >
          {buttonProps && <buttonProps.icon className="" />}
          {buttonProps.buttonText}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tootTipTitle}</p>
      </TooltipContent>
    </Tooltip>
  );
};
