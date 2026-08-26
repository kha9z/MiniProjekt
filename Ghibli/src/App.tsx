import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logotrans.png'

import type { Film } from './film'
import { getFilms } from './api/films'

function App() {
    const [films, setFilms] = useState<Film[]>([])

    useEffect(() => {
        async function loadFilms(): Promise<void> {
            const data: Film[] = await getFilms()
            setFilms(data)
        }
        loadFilms()
    }, [])

    return (
        <div className="app">
            <header className="header">
                <img 
                    src={logo}
                    className="Logo" />

                <button className="favorites-button">
                    <span>Favoriter</span>
                </button>

            </header>

            <main>
                <input 
                    className="search"
                    type="text"
                    placeholder="Sök efter film"
                />
            </main>
        </div>
    )
}
export default App
