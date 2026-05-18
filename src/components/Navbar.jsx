import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"

function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setMenuOpen(false)
    navigate("/")
  }

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

        {!user && <Link to="/login">Login</Link>}
      </div>

      {user ? (
        <div className="user-menu">
          <button
            className="user-profile"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={user.photoURL || "https://placehold.co/80x80?text=U"}
              alt={user.displayName || "User"}
            />
            <span>{user.displayName || "User"}</span>
          </button>

          {menuOpen && (
            <div className="user-dropdown">
              <p>{user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  )
}

export default Navbar