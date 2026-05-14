import { useEffect, useState } from "react"

function App() {
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

      setItems(category === "anime" ? data.data : data.results)
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

    setItems(category === "anime" ? data.data : data.results)
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchItems()
    }
  }

  const getTitle = (item) => {
    return item.title || item.name || item.title_english
  }

  const getDate = (item) => {
    const date = item.release_date || item.first_air_date || item.aired?.from

    if (!date) {
      return "No release date"
    }

    return date.slice(0, 10)
  }

  const getPoster = (item) => {
    return item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : item.images?.jpg?.large_image_url ||
          "https://placehold.co/500x750?text=No+Image"
  }

  const getRating = (item) => {
    return item.vote_average || item.score || 0
  }

  const getDescription = (item) => {
    return item.overview || item.synopsis || "No description available."
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">AniMovie Hub</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Series</a>
          <a href="#">Anime</a>
          <a href="#">Favorites</a>
        </div>
      </nav>

      <main className="hero">
        <h1>
          Discover Your Next
          <span> Favorite Story</span>
        </h1>

        <p>Search movies, series and anime in one place.</p>

        <div className="category-buttons">
          <button
            className={category === "movie" ? "active-category" : ""}
            onClick={() => {
              setCategory("movie")
              setSearch("")
            }}
          >
            Movies
          </button>

          <button
            className={category === "tv" ? "active-category" : ""}
            onClick={() => {
              setCategory("tv")
              setSearch("")
            }}
          >
            TV Shows
          </button>

          <button
            className={category === "anime" ? "active-category" : ""}
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
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={searchItems}>Search</button>

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
          <div className="loader"></div>
        ) : items.length === 0 ? (
          <p className="no-results">No results found.</p>
        ) : (
          <div className="movies-grid">
            {items.map((item) => (
              <div
                className="movie-card"
                key={item.id}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={getPoster(item)}
                  alt={getTitle(item)}
                />

                <div className="movie-info">
                  <h3>{getTitle(item)}</h3>

                  <p>{getDate(item)}</p>

                  <span>
                    ⭐ {getRating(item).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedItem && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>

            <img
              src={getPoster(selectedItem)}
              alt={getTitle(selectedItem)}
            />

            <div className="modal-info">
              <h2>{getTitle(selectedItem)}</h2>

              <p className="modal-date">
                {getDate(selectedItem)}
              </p>

              <p className="modal-rating">
                ⭐ {getRating(selectedItem).toFixed(1)}
              </p>

              <p className="modal-overview">
                {getDescription(selectedItem)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App