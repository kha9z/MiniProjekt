import * as z from 'zod'
import { filmSchema, type Film} from '../validation/filmSchema'

type ReactSet = (films: Film[]) => void

async function getFilms(setFilms: ReactSet): Promise<void> {
    const url: string = 'https://ghibliapi.vercel.app/films'

try {
    const response: Response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Fel från API. Statuskod: ${response.status}`)
    }
    
    const data: unknown = await response.json()

    const parsedData: Film[] = z
        .array(filmSchema)
        .parse(data)

    setFilms(parsedData)

} catch (error) {

    const message: string = error instanceof Error
    ? error.message : 'Okänt fel.'

    console.error(`Fel vid hämtning av filmer:`, message)
}}

export { getFilms }