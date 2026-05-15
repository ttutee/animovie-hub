import { useState } from "react"

import {
    getTitle,
    getDate,
    getPoster,
    getRating,
} from "../utils/mediaHelpers"

import {
    isStoredItem,
    toggleStoredItem,
} from "../utils/storageHelpers"

function MediaCard({ item, onClick }) {
    const [isFavorite, setIsFavorite] = useState(
        isStoredItem("favorites", item.id)
    )

    const handleFavoriteClick = (e) => {
        e.stopPropagation()

        toggleStoredItem("favorites", item)
        setIsFavorite(!isFavorite)
    }

    return (
        <div
            className="movie-card"
            onClick={() => onClick(item)}
        >
            <button
                className={`favorite-button ${isFavorite ? "favorite-active" : ""
                    }`}
                onClick={handleFavoriteClick}
            >
                <span className="heart-icon">♥</span>
            </button>

            <img src={getPoster(item)} alt={getTitle(item)} />

            <div className="movie-info">
                <h3>{getTitle(item)}</h3>
                <p>{getDate(item)}</p>
                <span>⭐ {getRating(item).toFixed(1)}</span>
            </div>
        </div>
    )
}

export default MediaCard