import * as z from 'zod'

export const filmSchema = z.object ({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    director: z.string(),
    release_date: z.string(),
    image: z.string()
})

export type Film = z.infer<typeof filmSchema>