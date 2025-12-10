"use client";

import { PiggyBank } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface Props {
  mobile?: boolean;
}

export const Logo = ({ mobile }: Props) => {
  const { theme, systemTheme } = useTheme();
  const isDarkTheme = theme === "dark" || (theme === "system" && systemTheme === "dark");
  console.log(theme);
  return (
    <Link href="/" className="flex items-center gap-2">
      {!mobile && <PiggyBank className="stroke h-11 w-11 stroke-amber-500 strock-[1.5]" />}
      {/* <p className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-3xl font-bold tracking-tighter [text-shadow:0_0_8px_rgba(255,180,0,0.8),0_0_14px_rgba(255,130,0,0.6)]">
        Budget Tracker
      </p> */}
      <p
        className={cn(
          "bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-3xl font-bold tracking-tighter",
          isDarkTheme && "[text-shadow:0_0_8px_rgba(255,180,0,0.8),0_0_14px_rgba(255,130,0,0.6)]"
        )}
      >
        Budget Tracker
      </p>
    </Link>
  );
};
