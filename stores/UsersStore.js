export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    user: {},
    pagination: {}
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
    deleteUserByIndex(index) {
      this.users.splice(index, 1)
    },
    addUsers(user) {
      this.users.push(user)
    },

    async getUsers(n = 1) {
      clearNotifications()

      try {
        await useAuth().refreshToken()

        const data = await useFetchApi(`/records?page=${n}`)

        if (data?.items) {
          this.users = handleClientUsers(data.items)
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

        this.user = data ? handleClientUser(data) : null
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(userDeleteData) {
      try {
        await useAuth().refreshToken()

        const deleteUser = await useFetchApi(`/records/${userDeleteData.id}`, {
          method: 'DELETE'
        })

        if (deleteUser) {
          this.deleteUserByIndex(userDeleteData.index)
          setSuccessMessage('Пользователь удален')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(user) {
      clearNotifications()

      try {
        await useAuth().refreshToken()

        const processedData = handleClientUsers(user.data)

        if (isEmptyObj(user.errors) && !isEmptyObj(processedData)) {
          const toAddUser = handleServerObject(processedData)

          const newUser = await useFetchApi(`/records`, {
            method: 'POST',
            body: { ...toAddUser }
          })

          if (newUser) {
            setSuccessMessage('Пользователь успешно добавлен')

            if (this.users.length < 10) this.addUsers(newUser)
          }
        } else {
          setErrorMessage('Ошибка, поля некорректные')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editUser(user) {
      clearNotifications()
      try {
        await useAuth().refreshToken()

        const id = user.userId
        const processedData = handleValidationObject(user.data)

        if (isEmptyObj(user.errors) && !isEmptyObj(processedData)) {
          const toEditData = handleServerObject(processedData)
          const editedUser = await useFetchApi(`/records/${id}`, {
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
