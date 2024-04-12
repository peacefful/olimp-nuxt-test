export const useAuth = () => {
  const authorization = async (authData) => {
    try {
      const token = useCookie('token')
      const data = await useFetchApi(`/auth/signin`, {
        method: 'POST',
        body: { ...authData }
      })

      if (data?.access_token) {
        token.value = data.access_token
        navigateTo('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const refreshToken = async () => {
    try {
      const token = useCookie('token')
      const refreshToken = await useFetchApi(`/auth/refresh`, {
        method: 'POST',
        body: {
          access_token: token.value
        }
      })

      token.value = await refreshToken.access_token
    } catch (error) {
      error.status === 401 ? navigateTo('/') : null
    }
  }

  const logout = () => navigateTo('/')

  return {
    authorization,
    refreshToken,
    logout
  }
}
