import { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem('token')
    if(token) {
      if(jwt_decode(token).exp < Date.now() / 1000) {
        localStorage.clear()
        return null
      } else {
        return token
      }
    }
    return null
  }

  const [token, setToken] = useState(getToken())
  useEffect(() => {
    const token = getToken()
    setToken(token)
  }, [])

  const saveToken = userToken => {
    localStorage.setItem('token', userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}

export default useToken