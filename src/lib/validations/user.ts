import { z } from "zod";

export const UserValidationSchema = z.object({
  username: z.string().min(2).max(50),
});

export const UserFormDefaultValues = {
  username: "",
};
