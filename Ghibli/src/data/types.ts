import * as z from 'zod'

export const FilmSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    director: z.string(),
    release_date: z.string(),
    image: z.string()
})

export type Film = z.infer<typeof FilmSchema>

export type ApiState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: Film[] }
    | { status: 'error'; message: string }