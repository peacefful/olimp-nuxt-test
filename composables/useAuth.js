export const useAuth = () => {
  const token = useCookie('token')

  const authorization = async (authObj) => {
    try {
      const data = await useFetchApi(`/auth/signin`, {
        method: 'POST',
        body: { ...authObj }
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

  const logout = () => {
    token.value = 0
    navigateTo('/')
  }

  return {
    authorization,
    refreshToken,
    logout
  }
}
