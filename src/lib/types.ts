import z from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("required"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});
