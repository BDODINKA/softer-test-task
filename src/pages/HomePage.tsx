import { FC, useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'

import { AddFileForm } from '../components/AddFileForm/AddFileForm'

export const HomePage: FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    setIsLogin(true)
  }, [])

  if (!isLogin) Navigate({ to: '/login' })

  return (
    <div>
      <AddFileForm />
    </div>
  )
}
