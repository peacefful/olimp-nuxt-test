export const useAuth = async (authData) => {
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