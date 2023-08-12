import { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { CircularProgress, Container } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { Context } from '../app/App'
import { YandexType, YandexTypeData } from '../types/YandexType'

export const StartPage = () => {
  const { isLogin, setIsLoginHandler } = useContext(Context)
  const [initialize, setInitialize] = useState(false)
  const token = localStorage.getItem('AuthToken')

  useEffect(() => {
    if (token) {
      setInitialize(true)
      setIsLoginHandler()
    }
  }, [initialize])

  useLayoutEffect(() => {
    if (!token) {
      const script = document.createElement('script')

      document.body.appendChild(script)

      window.onload = async function () {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const init: YandexType = await window.YaAuthSuggest.init(
            {
              client_id: import.meta.env.VITE_CLIENT_ID,
              response_type: 'token',
              redirect_uri: import.meta.env.VITE_REDIRECT_URL,
            },
            import.meta.env.VITE_BASE_URL_APP,
            {
              view: 'button',
              parentId: 'container',
              buttonView: 'main',
              buttonTheme: 'light',
              buttonSize: 'm',
              buttonBorderRadius: 0,
            }
          )

          setInitialize(true)

          const res: YandexTypeData = await init.handler()

          localStorage.setItem('AuthToken', res.access_token)

          setIsLoginHandler()
        } catch (e) {
          if (e instanceof Error) {
            console.error(e)
          }
        }
      }

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  if (isLogin) return <Navigate to={'/home'} />

  return (
    <Container
      style={{
        width: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {!initialize && <CircularProgress size={100} />}
    </Container>
  )
}
