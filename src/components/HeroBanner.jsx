import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import {
  getTitle,
  getDescription,
} from "../utils/mediaHelpers"

function HeroBanner() {
  const navigate = useNavigate()

  const [featured, setFeatured] =
    useState(null)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`
        )

        const data =
          await response.json()

        const randomMovie =
          data.results[
            Math.floor(
              Math.random() *
                data.results.length
            )
          ]

        setFeatured(randomMovie)
      } catch (error) {
        console.error(error)
      }
    }

    loadFeatured()
  }, [])

  if (!featured) {
    return null
  }

  const backdrop = `https://image.tmdb.org/t/p/original${featured.backdrop_path}`

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `url(${backdrop})`,
      }}
    >
      <div className="hero-banner-overlay">
        <div className="hero-banner-content">
          <h1>
            {getTitle(featured)}
          </h1>

          <p>
            {getDescription(
              featured
            ).slice(0, 180)}
            ...
          </p>

          <div className="hero-banner-buttons">
            <button
              onClick={() =>
                navigate(
                  `/detail/movie/${featured.id}`,
                  {
                    state: {
                      from: "/",
                    },
                  }
                )
              }
            >
              ▶ Watch Now
            </button>

            <button className="secondary-button">
              + Watchlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner