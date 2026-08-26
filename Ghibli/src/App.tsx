import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logotrans.png'
import type { Film } from './film'
import { getFilms } from './api/films'

function App() {

    const [films, setFilms] = useState<Film[]>([])

    useEffect(() => {
        getFilms(setFilms)
    }, [])

    return (
        <div className="app">
            <header className="header">

                <img
                    src={logo}
                    className="Logo"
                    alt="Studio Ghibli"
                />

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
            <button onClick={() => getFilms(setFilms)}>
                Hämta filmzz
            </button>

            <p>Antal filmzz: {films.length}</p>
        </div>
    )
}

export default App