import { createContext, FC, useState } from 'react'

import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { StartPage } from '../pages/StartPage'

export const Context = createContext<{ isLogin: boolean; setIsLoginHandler: () => void }>({
  isLogin: false,
  setIsLoginHandler: () => undefined,
})
export const App: FC = () => {
  const [isLogin, setIsLogin] = useState(false)

  const setIsLoginHandler = () => {
    setIsLogin(prevState => !prevState)
  }

  return (
    <Context.Provider value={{ isLogin, setIsLoginHandler }}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login/*" element={<LoginPage />} />
      </Routes>
    </Context.Provider>
  )
}
