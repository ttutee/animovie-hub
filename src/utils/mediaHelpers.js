export const getTitle = (item) => {
  return item.title || item.name || item.title_english
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
  return item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : item.images?.jpg?.large_image_url ||
        "https://placehold.co/500x750?text=No+Image"
}

export const getRating = (item) => {
  return item.vote_average || item.score || 0
}

export const getDescription = (item) => {
  return (
    item.overview ||
    item.synopsis ||
    "No description available."
  )
}