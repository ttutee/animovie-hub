import {
  getTitle,
  getDate,
  getPoster,
  getRating,
  getDescription,
} from "../utils/mediaHelpers"

function DetailModal({ item, onClose }) {
  if (!item) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={getPoster(item)}
          alt={getTitle(item)}
        />

        <div className="modal-info">
          <h2>{getTitle(item)}</h2>

          <p className="modal-date">
            {getDate(item)}
          </p>

          <p className="modal-rating">
            ⭐ {getRating(item).toFixed(1)}
          </p>

          <p className="modal-overview">
            {getDescription(item)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DetailModal