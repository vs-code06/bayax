"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonPlanObject = exports.signInObject = exports.signUpObject = void 0;
const zod_1 = require("zod");
exports.signUpObject = zod_1.z.object({
    email: zod_1.z.string().email({ message: "provide a valid email address" }),
    username: zod_1.z
        .string()
        .min(5, { message: "min 5 character is needed" })
        .max(20, { message: "max 20 character is allowed" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(20, { message: "Password must not exceed 20 characters." }),
});
exports.signInObject = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Provide a valid email" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(20, { message: "Password must not exceed 20 characters." }),
});
exports.lessonPlanObject = zod_1.z.object({
    subject: zod_1.z.string().min(1, { message: "subject is required" }),
    topic: zod_1.z.string().min(1, { message: "topic is required" }),
    grade: zod_1.z.number().min(1, { message: "grade is required" }),
    duration: zod_1.z.number(),
});
