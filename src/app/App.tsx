import { FC } from 'react'

import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { StartPage } from '../pages/StartPage'

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login/*" element={<LoginPage />} />
    </Routes>
  )
}
