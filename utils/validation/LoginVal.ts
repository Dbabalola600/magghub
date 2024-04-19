import {z} from "zod";

export const loginwithEmailSchema = z
.object({
    name: z
    .string({ required_error:" Invalid"  }),

    password:z
    .string ({ required_error:"Invalid" }),

})

export type loginwithEmailFormType = z.infer<typeof loginwithEmailSchema> 