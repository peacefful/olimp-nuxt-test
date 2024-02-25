const BASE_URL = useRuntimeConfig().public.BASE_URL
const token = useCookie('token')

export const refreshAccessToken = async () => {
  try {
    const newToken = await $fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: JSON.stringify({ access_token: token.value })
    })

    return newToken.access_token
  } catch (error) {
    console.log(error)
  }
}
