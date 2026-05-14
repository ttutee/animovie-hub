import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Anime from "./pages/Anime"
import Favorites from "./pages/Favorites"
import Watchlist from "./pages/Watchlist"
import Login from "./pages/Login"
import Detail from "./pages/Detail"

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:type/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App