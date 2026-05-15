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

  const handleFavoriteClick = (e) => {
    e.stopPropagation()

    toggleStoredItem("favorites", {
      ...item,
      id: itemId,
    })

    setIsFavorite(!isFavorite)
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

        <button
          className={`favorite-button ${
            isFavorite ? "favorite-active" : ""
          }`}
          onClick={handleFavoriteClick}
        >
          <span className="heart-icon">♥</span>
        </button>
      </div>
    </div>
  )
}

export default MediaCard