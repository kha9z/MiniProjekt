import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logotrans.png'

import type { ApiState } from './data/types'
import { getFilms } from './data/ghibliApi'

function App() {

    const [apiState, setApiState] =
        useState<ApiState>({ status: 'idle' })

    useEffect(() => {
        getFilms(setApiState)
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

                <p>Status: {apiState.status}</p>

                {apiState.status === 'loading' && (
                    <p>Laddar filmer...</p>
                )}

                {apiState.status === 'error' && (
                    <p>Fel: {apiState.message}</p>
                )}

                {apiState.status === 'success' && (
                    <p>
                        Antal filmer: {apiState.data.length}
                    </p>
                )}  
            </main>
        </div>
    )
}

export default App