import * as z from 'zod'
import { FilmSchema, type Film, type ApiState } from './types'

type ReactSet = (state: ApiState) => void

async function getFilms(setApiState: ReactSet): Promise<void> {
    const url: string = 'https://ghibliapi.vercel.app/films'

    try {
        setApiState({ status: 'loading' })

        const response: Response = await fetch(url)

        if (!response.ok) {
            throw new Error(
                `Fel från API. Statuskod: ${response.status}`
            )
        }

        const data: unknown = await response.json()
        const parsedData: Film[] = z.array(FilmSchema).parse(data)

        setApiState({
            status: 'success',
            data: parsedData
        })

    } catch (error) {

        const message: string =
            error instanceof Error
                ? error.message
                : 'Okänt fel.'

        setApiState({
            status: 'error',
            message
        })
        console.error('Fel vid hämtning av filmer:', message)
    }
}

export { getFilms }