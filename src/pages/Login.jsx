import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import { useNavigate } from "react-router-dom"

import { auth } from "../firebase"

function Login() {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const provider =
        new GoogleAuthProvider()

      await signInWithPopup(
        auth,
        provider
      )

      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>AniMovie Hub</h1>

        <p>
          Sign in to continue
        </p>

        <button
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Login