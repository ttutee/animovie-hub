export const getTitle = (item) => {
  return item.title || item.name || item.title_english || "Untitled"
}

export const getDate = (item) => {
  const date =
    item.release_date ||
    item.first_air_date ||
    item.aired?.from

  if (!date) {
    return "No release date"
  }

  return date.slice(0, 10)
}

export const getPoster = (item) => {
  if (item.poster_path) {
    return `https://image.tmdb.org/t/p/w500${item.poster_path}`
  }

  if (item.images?.jpg?.large_image_url) {
    return item.images.jpg.large_image_url
  }

  if (item.images?.jpg?.image_url) {
    return item.images.jpg.image_url
  }

  return "https://placehold.co/500x750?text=No+Image"
}

export const getRating = (item) => {
  const rating = item.vote_average ?? item.score

  if (rating === null || rating === undefined || rating === "") {
    return 0
  }

  return Number(rating)
}

export const getDescription = (item) => {
  return item.overview || item.synopsis || "No description available."
}

export const getMediaId = (item) => {
  return item.id || item.mal_id
}