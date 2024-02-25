export const useAuthorizationStore = defineStore('authorizationStore', {
  actions: {
    async authorization(email, password) {
      const BASE_URL = useRuntimeConfig().public.BASE_URL
      const token = useCookie('token')

      try {
        const data = await $fetch(`${BASE_URL}/auth/signin`, {
          method: 'POST',
          body: { email, password }
        })

        if (data?.access_token) {
          token.value = data.access_token
          console.log(token.value)
          navigateTo('/home')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async refreshToken(token) {
      const BASE_URL = useRuntimeConfig().public.BASE_URL
      const newToken = useCookie('token')

      try {
        const refreshToken = await $fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            access_token: token
          }
        })

        if (newToken) {
          newToken.value = await refreshToken.access_token
        }
      } catch (error) {
        error.status === 401 ? navigateTo('/') : null
      }
    }
  }
})
