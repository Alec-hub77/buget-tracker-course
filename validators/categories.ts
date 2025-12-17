import z from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .nonempty("Name is required")
    .min(3, "Name mast have least 2 characters")
    .max(20, "Name should not be lognger than 20 characters"),
  icon: z.string().min(1, { error: "Icon is required" }).max(20),
  type: z.enum(["income", "expense"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
