import React from "react";
import { cn } from "../lib/utils";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const PageManager: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main
      className={cn("w-full min-h-screen overflow-y-auto p-0.5", className)}
      {...props}
    >
      {children}
    </main>
  );
};
