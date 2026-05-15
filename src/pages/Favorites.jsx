import { useState } from "react"
import MediaCard from "../components/MediaCard"
import { getStoredItems } from "../utils/storageHelpers"

function Favorites() {
  const [favorites] = useState(() =>
    getStoredItems("favorites")
  )

  return (
    <section className="movies-section">
      <h2>My Favorites</h2>

      {favorites.length === 0 ? (
        <p className="no-results">
          You don't have favorites yet.
        </p>
      ) : (
        <div className="movies-grid">
          {favorites.map((item) => (
            <MediaCard
              key={item.id || item.mal_id}
              item={item}
              sourceType={
                item.mal_id
                  ? "anime"
                  : item.first_air_date
                    ? "tv"
                    : "movie"
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favorites