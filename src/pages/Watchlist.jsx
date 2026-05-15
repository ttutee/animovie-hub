import { useState } from "react"
import MediaCard from "../components/MediaCard"
import { getStoredItems } from "../utils/storageHelpers"

function Watchlist() {
  const [watchlist] = useState(() =>
    getStoredItems("watchlist")
  )

  return (
    <section className="movies-section">
      <h2>My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="no-results">
          Your watchlist is empty.
        </p>
      ) : (
        <div className="movies-grid">
          {watchlist.map((item) => (
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

export default Watchlist