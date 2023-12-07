'use client'

import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const storedUserJson = typeof window !== 'undefined' ? window.localStorage.getItem("user"): ""
  const localStorageValue = storedUserJson ? JSON.parse(storedUserJson) : null;
  const [auth, setAuth] = useState(localStorageValue)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>  
  )
}

export default AuthContext