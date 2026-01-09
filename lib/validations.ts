import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import z from "zod";

export type TPetFormInput = z.input<typeof petFormSchema>;

export type TPetForm = z.output<typeof petFormSchema>;

export const petFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    ownerName: z.string().trim().min(1, "Owner Name is required"),
    imageUrl: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.url().optional()
    ),
    age: z.number().int().positive().max(100),
    notes: z.string().trim().optional(),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
    notes: data.notes || "",
  }));

export const petIdSchema = z.cuid("Invalid pet ID");

export const authSchema = z.object({
  email: z.email("Invalid email address").max(100),
  password: z.string().min(6, "Password must be at least 6 characters").max(30),
});

export type TAuth = z.infer<typeof authSchema>;
