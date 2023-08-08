import { useEffect } from 'react'

export const LoginPage = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!window) return

    window.onload = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.YaAuthSuggest.init(
        {
          client_id: '4adf1135278d48438112c8199446d58e',
          response_type: 'token',
          redirect_uri: 'https://examplesite.com/suggest/token',
        },
        'https://examplesite.com',
        {
          view: 'button',
          parentId: 'container',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0,
        }
      )
        .then(function (result: any) {
          return result.handler()
        })
        .then(function (data: any) {
          console.log('Сообщение с токеном: ', data)
          document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(data)}`
        })
        .catch(function (error: any) {
          console.log('Что-то пошло не так: ', error)
          document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error)}`
        })
    }
  })

  return <div>Hell</div>
}
