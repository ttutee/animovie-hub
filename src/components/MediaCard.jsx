import {
  getTitle,
  getDate,
  getPoster,
  getRating,
} from "../utils/mediaHelpers"

function MediaCard({ item, onClick }) {
  return (
    <div
      className="movie-card"
      onClick={() => onClick(item)}
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
  )
}

export default MediaCard