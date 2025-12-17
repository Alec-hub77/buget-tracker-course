"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { CreateCategorySchemaType, CreateCategorySchema } from "@/validators/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { icon, name, type } = parsedBody.data;

  try {
    return await prisma.category.create({
      data: {
        userId: user.id,
        name,
        icon,
        type,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("Category with this name already exist");
      }
    }
    throw err;
  }
}

export async function DeleteCategories() {
  try {
    await prisma.category.deleteMany({
      where: {
        userId: "user_36QNrmafTsrgMZRzQNYPpWEFk2h",
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(err?.message);
    }
  }
}
