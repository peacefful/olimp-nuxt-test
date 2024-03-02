export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    user: {},
    pagination: {},
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
      clearNotifications()

      try {
        await useAuth().refreshToken()

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
      clearNotifications()

      try {
        await useAuth().refreshToken()

        const data = await useFetchApi(`/records/${id}`)

        data ? (this.user = data) : null
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(userDeleteData) {
      try {
        await useAuth().refreshToken()

        const deleteUser = await useFetchApi(`/records/${userDeleteData.id}`, { method: 'DELETE' })

        if (deleteUser) {
          this.users.splice(userDeleteData.index, 1)
          setSuccessMessage('Пользователь удален')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(userData) {
      clearNotifications()

      try {
        await useAuth().refreshToken()

        if (isEmptyObj(userData.errors) && !isEmptyObj(userData)) {
          const toAddData = handleObject(userData)

          const user = await useFetchApi(`/records`, {
            method: 'POST',
            body: { ...toAddData }
          })

          if (user) {
            setSuccessMessage('Пользователь успешно добавлен')

            if (this.users.length < 10) {
              return this.users.push(user)
            } else {
              return
            }
          }
        } else {
          setErrorMessage('Ошибка, поля некорректные')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(userData) {
      clearNotifications()

      try {
        await useAuth().refreshToken()

        if (isEmptyObj(userData.errors) && !isEmptyObj(userData)) {
          const toEditData = handleObject(userData)

          const editedUser = await useFetchApi(`/records/${userData.userId}`, {
            method: 'PUT',
            body: { ...toEditData }
          })

          if (editedUser) setSuccessMessage('Пользователь сохранен')
        }
      } catch (error) {
        setErrorMessage('Ошибка, поля некорректные')
      }
    }
  }
})