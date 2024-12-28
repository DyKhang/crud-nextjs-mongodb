import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("mx-auto max-w-[80%]", className)}>{children}</div>;
};
