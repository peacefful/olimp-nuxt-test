export const useAuthorizationStore = defineStore('authorizationStore', {
  state: () => ({
    token: useCookie('token').value,
    baseUrl: useRuntimeConfig().public.BASE_URL
  }),
  actions: {
    async authorization(email, password) {
      try {
        const data = await $fetch(`${this.baseUrl}/auth/signin`, {
          method: 'POST',
          body: { email, password }
        })

        if (data?.access_token) {
          this.token = data.access_token
          navigateTo('/home')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async refreshToken(token) {
      const refreshToken = useCookie('token')

      try {
        const refreshToken = await $fetch(`${this.baseUrl}/auth/refresh`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${this.token}` },
          body: {
            access_token: token
          }
        })

        refreshToken.value = await refreshToken.access_token
      } catch (error) {
        error.status === 401 ? navigateTo('/') : null
      }
    }
  }
})
