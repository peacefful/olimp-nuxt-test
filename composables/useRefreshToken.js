export const useRefreshToken = async () => {
  try {
    const token = useCookie('token')
    const refreshToken = await useFetchApi(`/auth/refresh`, {
      method: 'POST',
      body: {
        access_token: token.value
      }
    })
    
    token.value = refreshToken.access_token
  } catch (error) {
    error.status === 401 ? navigateTo('/') : null
  }
}