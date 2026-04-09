import { z } from "zod";
export declare const signUpObject: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
}, {
    email: string;
    username: string;
    password: string;
}>;
export declare const signInObject: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const lessonPlanObject: z.ZodObject<{
    subject: z.ZodString;
    topic: z.ZodString;
    grade: z.ZodNumber;
    duration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    subject: string;
    topic: string;
    grade: number;
    duration: number;
}, {
    subject: string;
    topic: string;
    grade: number;
    duration: number;
}>;
