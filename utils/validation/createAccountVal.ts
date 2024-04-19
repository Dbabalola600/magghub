import { Schema, z } from "zod";


export const createAccountSchema = z
    .object({
        name: z
            .string({ required_error: " Invalid" }),

        password: z
            .string({ required_error: "Invalid" }),
        age: z
            .any({ required_error: " Invalid" }),
        email: z
            .string({ required_error: " Invalid" })
            .email({ message: "Must be a valid email address" }),



    })

export type createAccountFormType = z.infer<typeof createAccountSchema> 