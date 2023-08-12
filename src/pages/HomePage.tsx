import { FC, useContext } from 'react'

import { Container } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { Context } from '../app/App'
import { AddFileForm } from '../components/AddFileForm/AddFileForm'

export const HomePage: FC = () => {
  const { isLogin } = useContext(Context)

  if (!isLogin) return <Navigate to="/" />

  return (
    <Container style={{ paddingTop: '50px' }}>
      <AddFileForm />
    </Container>
  )
}
