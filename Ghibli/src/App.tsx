import { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logotrans.png'

import type { ApiState, Film } from './data/types'
import { getFilms } from './data/ghibliApi'

function App() {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [favorites, setFavorites] = useState<Film[]>([])
    const [search, setSearch] = useState<string>('')
    const [apiState, setApiState] =
        useState<ApiState>({ status: 'idle' })

    useEffect(() => {
        getFilms(setApiState)
    }, [])

    function toggleFavorite(film: Film): void {
        const isFavorite: boolean = favorites.some(
            (favorite) => favorite.id === film.id
        )

        if (isFavorite) {
            setFavorites(
                favorites.filter(
                    (favorite) => favorite.id !== film.id
                )
            )
        } else {
            setFavorites([...favorites, film])
        }
    }

    const filteredFilms: Film[] =
        apiState.status === 'success'
            ? apiState.data.filter((film) =>
                film.title.toLowerCase().includes(search.toLowerCase())
            )
                .sort((a, b) =>
                    Number(b.release_date) - Number(a.release_date))
            : []

    return (
        <div className="app">
            <header className="header">
                <img
                    src={logo}
                    className="Logo"
                    alt="Studio Ghibli"
                />
            </header>

            <main>
                <input
                    className="search"
                    type="text"
                    placeholder="Sök efter film"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value)
                        setCurrentIndex(0)
                    }}
                />

                {apiState.status === 'loading' && (
                    <p>Laddar filmer...</p>
                )}

                {apiState.status === 'error' && (
                    <p>Fel: {apiState.message}</p>
                )}

                {apiState.status === 'success' && (

                    <section className="movie-section">
                        <button
                            className="arrow arrow-left"
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            &lt;
                        </button>

                        <div className="carousel-window">
                            <div
                                className="films-carousel"
                                style={{
                                    transform: `translateX(-${currentIndex * 25}%)`
                                }}
                            >

                                {filteredFilms.map((film) => (
                                    <div
                                        className="film-card"
                                        key={film.id}
                                    >

                                        <button
                                            className="heart-button"
                                            onClick={() => toggleFavorite(film)}
                                        >
                                            {favorites.some(
                                                (favorite) =>
                                                    favorite.id === film.id
                                            )
                                                ? '♥'
                                                : '♡'}
                                        </button>

                                        <div className="film-image-container">
                                            <img
                                                src={film.image}
                                                alt={film.title}
                                            />

                                            <div className="film-overlay">
                                                <h3>{film.title}</h3>
                                                <p className="director">
                                                    Director: {film.director}
                                                </p>

                                                <p className="description">
                                                    {film.description}
                                                </p>
                                            </div>
                                        </div>

                                        <h2>{film.title} ({film.release_date})</h2>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="arrow arrow-right"
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                            disabled={currentIndex + 4 >= filteredFilms.length}
                        >
                            &gt;
                        </button>
                    </section>
                )}

                <section className="favorites-section">
                    <h2>Favoriter</h2>

                    {favorites.length === 0 ? (

                        <div className="favorites-empty">
                            <p>Du har inga favoritfilmer ännu.</p>
                        </div>

                    ) : (

                        <div className="favorites-list">
                            {favorites.map((film) => (
                                <div
                                    className="favorite-card"
                                    key={film.id}
                                >
                                    <img
                                        src={film.image}
                                        alt={film.title}
                                    />

                                    <h3> {film.title} {film.release_date} </h3>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default App