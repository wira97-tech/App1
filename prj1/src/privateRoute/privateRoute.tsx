import React, { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export const PrivateRoute: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      setIsLoading(false)
    }
  }, [])

  return <>{isLoading ? "Loding...." : <Outlet />}</>
}
