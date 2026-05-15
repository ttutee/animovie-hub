import { useState } from "react"

import {
  getTitle,
  getDate,
  getPoster,
  getRating,
  getMediaId,
} from "../utils/mediaHelpers"

import {
  isStoredItem,
  toggleStoredItem,
} from "../utils/storageHelpers"

function MediaCard({ item, onClick }) {
  const itemId = getMediaId(item)

  const [isFavorite, setIsFavorite] = useState(
    isStoredItem("favorites", itemId)
  )

  const [isWatchlist, setIsWatchlist] = useState(
    isStoredItem("watchlist", itemId)
  )

  const handleFavoriteClick = (e) => {
    e.stopPropagation()

    toggleStoredItem("favorites", {
      ...item,
      id: itemId,
    })

    setIsFavorite(!isFavorite)
  }

  const handleWatchlistClick = (e) => {
    e.stopPropagation()

    toggleStoredItem("watchlist", {
      ...item,
      id: itemId,
    })

    setIsWatchlist(!isWatchlist)
  }

  return (
    <div className="movie-card" onClick={() => onClick(item)}>
      <img src={getPoster(item)} alt={getTitle(item)} />

      <div className="movie-info">
        <h3>{getTitle(item)}</h3>

        <p>{getDate(item)}</p>

        <span>
          ⭐ {getRating(item) > 0 ? getRating(item).toFixed(1) : "N/A"}
        </span>

        <div className="card-actions">
          <button
            className={`favorite-button ${
              isFavorite ? "favorite-active" : ""
            }`}
            onClick={handleFavoriteClick}
            title="Add to favorites"
          >
            <span className="heart-icon">♥</span>
          </button>

          <button
            className={`watchlist-button ${
              isWatchlist ? "watchlist-active" : ""
            }`}
            onClick={handleWatchlistClick}
            title="Add to watchlist"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaCard