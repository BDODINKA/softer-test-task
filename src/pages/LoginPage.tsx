import { useEffect } from 'react'

export const LoginPage = () => {
  useEffect(() => {
    console.log('ssssss')
    window.onload = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.YaSendSuggestToken('http://localhost:3000/softer-test-task/#/login', {
        flag: true,
      })
    }
  }, [])

  return <div>Hell</div>
}
