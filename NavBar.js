import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Link from 'next/link'

export default function NavBar() {
  const { user, logout } = useContext(AuthContext)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/safety")
    socket.onmessage = (e) => {
      setAlert(e.data)
      setTimeout(() => setAlert(null), 5000)
    }
    return () => socket.close()
  }, [])

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      borderBottom: "1px solid #ccc"
    }}>
      <div>
        <Link href="/">🏠 Home</Link>{" | "}
        <Link href="/brand">🌈 Brand</Link>{" | "}<Link href="/waitlist">📩 Waitlist</Link>{" | "}
        <Link href="/profile">👤 Profile</Link>
      </div>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>{" "}
            <img
              src="http://localhost:8000/avatars/1_avatar.jpg"
              alt="avatar"
              width="30"
              height="30"
              style={{ borderRadius: "50%", verticalAlign: "middle", marginRight: "1rem" }}
            />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
      {alert && <div style={{ color: "red", marginTop: "0.5rem" }}>{alert}</div>}
    </nav>
  )
}
