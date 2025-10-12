import lightLogo from "@/assets/square-background-shrink.svg";
import darkLogo from "@/assets/square-primary-shrink.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export function Logo({className, ...props}: Omit<ComponentProps<typeof Image>, "src">) {
  return (
    <div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={lightLogo} className={cn("dark:hidden block", className)} {...props} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image src={darkLogo} className={cn("hidden dark:block", className)} {...props} />
    </div>
  );
}
