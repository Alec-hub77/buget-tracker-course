import { PiggyBank } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBank className="stroke h-11 w-11 stroke-amber-500 strock-[1.5]" />
      <p className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-3xl font-bold tracking-tighter [text-shadow:0_0_8px_rgba(255,180,0,0.8),0_0_14px_rgba(255,130,0,0.6)]">
        Budget Tracker
      </p>
    </Link>
  );
};
