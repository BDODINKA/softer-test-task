import { useEffect } from 'react'

export const LoginPage = () => {
  useEffect(() => {
    window.onload = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.YaSendSuggestToken(
        import.meta.env.PROD
          ? import.meta.env.VITE_REDIRECT_URL
          : import.meta.env.VITE_REDIRECT_URL_LOCAL,
        {
          flag: true,
        }
      )
    }
  }, [])

  return <div></div>
}
