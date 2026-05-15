import { useEffect, useState } from "react"

import MediaCard from "../components/MediaCard"
import DetailModal from "../components/DetailModal"
import SkeletonCard from "../components/SkeletonCard"

function Home() {
    const [items, setItems] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [category, setCategory] = useState("movie")

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true)

            const endpoint =
                category === "anime"
                    ? "https://api.jikan.moe/v4/top/anime"
                    : `https://api.themoviedb.org/3/${category}/popular?api_key=${import.meta.env.VITE_API_KEY}`

            const response = await fetch(endpoint)
            const data = await response.json()

            setItems(
                category === "anime"
                    ? data.data
                    : data.results
            )

            setLoading(false)
        }

        loadItems()
    }, [category])

    const searchItems = async () => {
        setLoading(true)

        const endpoint =
            category === "anime"
                ? `https://api.jikan.moe/v4/anime?q=${search}`
                : search.trim() === ""
                    ? `https://api.themoviedb.org/3/${category}/popular?api_key=${import.meta.env.VITE_API_KEY}`
                    : `https://api.themoviedb.org/3/search/${category}?api_key=${import.meta.env.VITE_API_KEY}&query=${search}`

        const response = await fetch(endpoint)
        const data = await response.json()

        setItems(
            category === "anime"
                ? data.data
                : data.results
        )

        setLoading(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchItems()
        }
    }

    return (
        <>
            <main className="hero">
                <h1>
                    Discover Your Next
                    <span> Favorite Story</span>
                </h1>

                <p>
                    Search movies, series and anime in one
                    place.
                </p>

                <div className="category-buttons">
                    <button
                        className={
                            category === "movie"
                                ? "active-category"
                                : ""
                        }
                        onClick={() => {
                            setCategory("movie")
                            setSearch("")
                        }}
                    >
                        Movies
                    </button>

                    <button
                        className={
                            category === "tv"
                                ? "active-category"
                                : ""
                        }
                        onClick={() => {
                            setCategory("tv")
                            setSearch("")
                        }}
                    >
                        TV Shows
                    </button>

                    <button
                        className={
                            category === "anime"
                                ? "active-category"
                                : ""
                        }
                        onClick={() => {
                            setCategory("anime")
                            setSearch("")
                        }}
                    >
                        Anime
                    </button>
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder={
                            category === "movie"
                                ? "Search movies..."
                                : category === "tv"
                                    ? "Search TV shows..."
                                    : "Search anime..."
                        }
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                    />

                    <button onClick={searchItems}>
                        Search
                    </button>

                    {search && (
                        <button
                            className="clear-button"
                            onClick={() => setSearch("")}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </main>

            <section className="movies-section">
                <h2>
                    {search.trim()
                        ? "Search Results"
                        : category === "movie"
                            ? "Popular Movies"
                            : category === "tv"
                                ? "Popular TV Shows"
                                : "Popular Anime"}
                </h2>

                {loading ? (
                    <div className="movies-grid">
                        {[...Array(12)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <p className="no-results">
                        No results found.
                    </p>
                ) : (
                    <div className="movies-grid">
                        {items.map((item) => (
                            <MediaCard
                                key={item.id}
                                item={item}
                                onClick={setSelectedItem}
                            />
                        ))}
                    </div>
                )}
            </section>

            <DetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    )
}

export default Home