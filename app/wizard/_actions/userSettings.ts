"use server";

import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/userSetting";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function updateUserCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({ currency });
  if (!parsedBody.success) {
    throw parsedBody.error;
  }
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const userSetting = await prisma.userSettings.update({
    where: { userId: user.id },
    data: { currency },
  });
  return userSetting;
}
