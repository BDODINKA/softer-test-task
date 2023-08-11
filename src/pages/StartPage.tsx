import { useEffect } from 'react'

export const StartPage = () => {
  useEffect(() => {
    const script = document.createElement('script')

    document.body.appendChild(script)

    window.onload = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.YaAuthSuggest.init(
        {
          client_id: import.meta.env.VITE_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'http://localhost:3000/softer-test-task/#/login/',
        },
        'http://localhost:3000/softer-test-task',
        {
          view: 'button',
          parentId: 'container',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0,
        }
      )
        .then((res: any) => {
          return res.handler()
        })
        .then((data: any) => {
          console.log(data)
        })
        .catch(function (error: any) {
          console.log('Что-то пошло не так: ', error)
          document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error)}`
        })
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div></div>
}
