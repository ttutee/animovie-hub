import { useEffect, useState } from "react"

import MediaCard from "./MediaCard"
import DetailModal from "./DetailModal"
import SkeletonCard from "./SkeletonCard"

function MediaPage({ type, title }) {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true)

        const endpoint =
          type === "anime"
            ? "https://api.jikan.moe/v4/top/anime"
            : `https://api.themoviedb.org/3/${type}/popular?api_key=${import.meta.env.VITE_API_KEY}`

        const response = await fetch(endpoint)
        const data = await response.json()

        const results =
          type === "anime"
            ? data.data || []
            : data.results || []

        setItems(results)
      } catch (error) {
        console.error("Error loading items:", error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [type])

  const searchItems = async () => {
    try {
      setLoading(true)

      const safeSearch =
        encodeURIComponent(search)

      const endpoint =
        type === "anime"
          ? `https://api.jikan.moe/v4/anime?q=${safeSearch}`
          : search.trim() === ""
            ? `https://api.themoviedb.org/3/${type}/popular?api_key=${import.meta.env.VITE_API_KEY}`
            : `https://api.themoviedb.org/3/search/${type}?api_key=${import.meta.env.VITE_API_KEY}&query=${safeSearch}`

      const response = await fetch(endpoint)
      const data = await response.json()

      const results =
        type === "anime"
          ? data.data || []
          : data.results || []

      setItems(results)
    } catch (error) {
      console.error(
        "Error searching items:",
        error
      )

      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchItems()
    }
  }

  return (
    <>
      <main className="hero">
        <h1>{title}</h1>

        <p>
          Discover the best{" "}
          {title.toLowerCase()}.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
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
            : `Popular ${title}`}
        </h2>

        {loading ? (
          <div className="movies-grid">
            {[...Array(12)].map(
              (_, index) => (
                <SkeletonCard
                  key={index}
                />
              )
            )}
          </div>
        ) : items.length === 0 ? (
          <p className="no-results">
            No results found.
          </p>
        ) : (
          <div className="movies-grid">
            {items.map((item) => (
              <MediaCard
                key={item.id || item.mal_id}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        )}
      </section>

      <DetailModal
        item={selectedItem}
        onClose={() =>
          setSelectedItem(null)
        }
      />
    </>
  )
}

export default MediaPage