import { z } from "zod";

export const signUpObject = z.object({
  email: z.string().email({ message: "provide a valid email address" }),
  username: z
    .string()
    .min(5, { message: "min 5 character is needed" })
    .max(20, { message: "max 20 character is allowed" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must not exceed 20 characters." }),
});

export const signInObject = z.object({
  email: z.string().email({ message: "Provide a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must not exceed 20 characters." }),
});

export const lessonPlanObject = z.object({
  subject: z.string().min(1, { message: "subject is required" }),
  topic: z.string().min(1, { message: "topic is required" }),
  grade: z.number().min(1, { message: "grade is required" }),
  duration: z.number(),
});
