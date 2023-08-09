import { useEffect } from 'react'

export const LoginPage = () => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js'
    document.head.appendChild(script)
    window.onload = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res: { status: string; handler: () => Promise } = await YaAuthSuggest.init(
          {
            client_id: '4adf1135278d48438112c8199446d58e',
            response_type: 'token',
            redirect_uri: 'http://localhost:3000/softer-test-task/#/login',
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

        await res.handler()

        const script = document.createElement('script')

        script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js'
        document.head.appendChild(script)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.onload = window.YaSendSuggestToken(
          'http://localhost:3000/softer-test-task/#/login',
          {
            flag: true,
          }
        )
      } catch (e) {
        console.log(e)
      }
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return <div id={'login'}>Hell</div>
}
