import { useState } from "react"

import { useNavigate } from "react-router-dom"

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

import Toast from "./Toast"

function MediaCard({ item, sourceType }) {
    const navigate = useNavigate()

    const itemId = getMediaId(item)

    const [isFavorite, setIsFavorite] =
        useState(
            isStoredItem(
                "favorites",
                itemId
            )
        )

    const [isWatchlist, setIsWatchlist] =
        useState(
            isStoredItem(
                "watchlist",
                itemId
            )
        )

    const [toastMessage, setToastMessage] =
        useState("")

    const handleFavoriteClick = (e) => {
        e.stopPropagation()

        toggleStoredItem("favorites", {
            ...item,
            id: itemId,
        })

        const newValue = !isFavorite

        setIsFavorite(newValue)

        setToastMessage(
            newValue
                ? "Added to favorites"
                : "Removed from favorites"
        )

        setTimeout(() => {
            setToastMessage("")
        }, 2500)
    }

    const handleWatchlistClick = (e) => {
        e.stopPropagation()

        toggleStoredItem("watchlist", {
            ...item,
            id: itemId,
        })

        const newValue = !isWatchlist

        setIsWatchlist(newValue)

        setToastMessage(
            newValue
                ? "Added to watchlist"
                : "Removed from watchlist"
        )

        setTimeout(() => {
            setToastMessage("")
        }, 2500)
    }

    const handleNavigate = () => {
        let mediaType = sourceType || "movie"

        if (item.mal_id) {
            mediaType = "anime"
        }

        const from =
            mediaType === "anime"
                ? "/anime"
                : mediaType === "tv"
                    ? "/series"
                    : "/movies"

        navigate(
            `/detail/${mediaType}/${item.id || item.mal_id}`,
            {
                state: {
                    from,
                },
            }
        )
    }

    return (
        <>
            <div
                className="movie-card"
                onClick={handleNavigate}
            >
                <img
                    src={getPoster(item)}
                    alt={getTitle(item)}
                />

                <div className="movie-info">
                    <h3>{getTitle(item)}</h3>

                    <p>{getDate(item)}</p>

                    <span>
                        ⭐{" "}
                        {getRating(item) > 0
                            ? getRating(item).toFixed(
                                1
                            )
                            : "N/A"}
                    </span>

                    <div className="card-actions">
                        <button
                            className={`favorite-button ${isFavorite
                                    ? "favorite-active"
                                    : ""
                                }`}
                            onClick={handleFavoriteClick}
                            title="Add to favorites"
                        >
                            <span className="heart-icon">
                                ♥
                            </span>
                        </button>

                        <button
                            className={`watchlist-button ${isWatchlist
                                    ? "watchlist-active"
                                    : ""
                                }`}
                            onClick={handleWatchlistClick}
                            title="Add to watchlist"
                        >
                            <span className="watchlist-icon">
                                {isWatchlist ? "✓" : "+"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {toastMessage && (
                <Toast message={toastMessage} />
            )}
        </>
    )
}

export default MediaCard