import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">AniMovie Hub</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/series">Series</Link>
        <Link to="/anime">Anime</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar