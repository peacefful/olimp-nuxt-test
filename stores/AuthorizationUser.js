export const useAuthorizationStore = defineStore('authorizationStore', {
  state: () => ({
    token: useCookie('token').value
  }),
  actions: {
    async authorization(authObj) {
      try {
        const data = await useFetchApi(`/auth/signin`, {
          method: 'POST',
          body: { ...authObj }
        })

        if (data?.access_token) {
          this.token = data.access_token
          navigateTo('/home')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async refreshToken() {
      const newToken = useCookie('token')

      try {
        const refreshToken = await useFetchApi(`/auth/refresh`, {
          method: 'POST',
          body: {
            access_token: this.token
          }
        })

        newToken.value = await refreshToken.access_token
      } catch (error) {
        error.status === 401 ? navigateTo('/') : null
      }
    }
  }
})
