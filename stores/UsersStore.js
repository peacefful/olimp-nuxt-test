export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    user: {},
    pagination: {},

    successMessage: '',
    errorMessage: ''
  }),
  getters: {
    sortByKey: (state) => {
      return (key) => {
        if (key) {
          return state.users.sort((a, b) => {
            const options = { a, b, key }
            return compareStrings(options)
          })
        } else {
          return state.users
        }
      }
    }
  },
  actions: {
    async getUsers(n = 1) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken()

        const data = await useFetchApi(`/records?page=${n}`)

        if (data?.items) {
          this.users = data.items
          this.pagination = data._meta
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUser(id) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken()

        const data = await useFetchApi(`/records/${id}`)

        data ? (this.user = data) : null
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id, index) {
      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken()

        const deleteUser = await useFetchApi(`/records/${id}`, { method: 'DELETE' })

        if (deleteUser) {
          this.users.splice(index, 1)
          this.successMessage = 'Пользователь удален'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(userData) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken()

        const data = handleObject(userData)

        if (isEmptyObj(userData.errors) && !isEmptyObj(data)) {
          const user = await useFetchApi(`/records`, {
            method: 'POST',
            body: { ...data }
          })

          if (user) {
            this.successMessage = 'Пользователь добавлен'

            if (this.users.length < 10) {
              return this.users.push(user)
            } else {
              return
            }
          }
        } else {
          this.errorMessage = 'Ошибка, поля некорректные'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(userData) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken()

        const data = handleObject(userData)

        if (isEmptyObj(userData.errors) && !isEmptyObj(data)) {
          const editUser = await useFetchApi(`/records/${userData.userId}`, {
            method: 'PUT',
            body: { ...data }
          })

          if (editUser) {
            this.successMessage = 'Пользователь сохранен'
            this.errorMessage = ''
          }
        }
      } catch (error) {
        this.errorMessage = 'Ошибка, поля некорректные'
      }
    }
  }
})
