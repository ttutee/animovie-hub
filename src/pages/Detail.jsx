import { useEffect, useState } from "react"

import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom"

import {
  getPoster,
  getTitle,
  getRating,
  getDescription,
  getMediaId,
} from "../utils/mediaHelpers"

import {
  isStoredItem,
  toggleStoredItem,
} from "../utils/storageHelpers"

function Detail() {
  const { type, id } = useParams()

  const navigate = useNavigate()

  const location = useLocation()

  const fromPage =
    location.state?.from || "/"

  const [item, setItem] = useState(null)

  const [loading, setLoading] =
    useState(true)

  const [isFavorite, setIsFavorite] =
    useState(false)

  const [isWatchlist, setIsWatchlist] =
    useState(false)

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true)

        const endpoint =
          type === "anime"
            ? `https://api.jikan.moe/v4/anime/${id}`
            : `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`

        const response = await fetch(
          endpoint
        )

        const data =
          await response.json()

        const result =
          type === "anime"
            ? data.data
            : data

        setItem(result)

        const mediaId =
          result.id || result.mal_id

        setIsFavorite(
          isStoredItem(
            "favorites",
            mediaId
          )
        )

        setIsWatchlist(
          isStoredItem(
            "watchlist",
            mediaId
          )
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadDetail()
  }, [type, id])

  if (loading) {
    return (
      <div className="detail-loading">
        Loading...
      </div>
    )
  }

  if (!item) {
    return (
      <div className="detail-loading">
        Not found
      </div>
    )
  }

  const itemId = getMediaId(item)

  const backdrop =
    item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : getPoster(item)

  const handleFavorite = () => {
    toggleStoredItem("favorites", {
      ...item,
      id: itemId,
    })

    setIsFavorite(!isFavorite)
  }

  const handleWatchlist = () => {
    toggleStoredItem("watchlist", {
      ...item,
      id: itemId,
    })

    setIsWatchlist(!isWatchlist)
  }

  return (
    <div className="detail-page">
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: `url(${backdrop})`,
        }}
      >
        <div className="detail-overlay">
          <button
            className="back-button"
            onClick={() =>
              navigate(fromPage)
            }
          >
            ← Back
          </button>

          <div className="detail-content">
            <img
              className="detail-poster"
              src={getPoster(item)}
              alt={getTitle(item)}
            />

            <div className="detail-info">
              <h1>{getTitle(item)}</h1>

              <p className="detail-rating">
                ⭐{" "}
                {getRating(item) > 0
                  ? getRating(item).toFixed(
                      1
                    )
                  : "N/A"}
              </p>

              <div className="detail-actions">
                <button
                  onClick={handleFavorite}
                >
                  {isFavorite
                    ? "♥ Favorited"
                    : "♡ Favorite"}
                </button>

                <button
                  onClick={
                    handleWatchlist
                  }
                >
                  {isWatchlist
                    ? "✓ In Watchlist"
                    : "+ Watchlist"}
                </button>
              </div>

              <p className="detail-description">
                {getDescription(item)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail