import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { setAuthToken } from '../src/utils/setAuthToken'
import { authState } from '../atoms/auth'
import API from '../src/utils/api'
import theme from '../src/theme'

const AppInit = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [isAuth, setIsAuth] = useRecoilState(authState)

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently()

        try {
          setAuthToken(accessToken)
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`
          const res = await API.get(url)

          const { id, name, role } = res.data
          const currentUser = { user: { id, name, role }, accessToken }
          setIsAuth(currentUser)
        } catch (e) {
          throw new Error(e)
        }
      }
    })()
  }, [getAccessTokenSilently, isAuthenticated])
  return null
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
  return (
    <Auth0Provider
      domain={'dev-business-app.us.auth0.com'}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_APP_URL}
      audience={process.env.NEXT_PUBLIC_AUTH0_API_URL}
    >
      <RecoilRoot>
        <StylesProvider injectFirst>
          <MaterialUIThemeProvider theme={theme}>
            <StyledComponentsThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
              <AppInit />
            </StyledComponentsThemeProvider>
          </MaterialUIThemeProvider>
        </StylesProvider>
      </RecoilRoot>
    </Auth0Provider>
  )
}
export default MyApp
