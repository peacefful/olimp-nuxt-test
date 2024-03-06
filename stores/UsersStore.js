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
          this.deleteUserByIndex(userDeleteData.index)
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
          const toAddUser = handleObject(userData)

          const newUser = await useFetchApi(`/records`, {
            method: 'POST',
            body: { ...toAddUser }
          })

          if (newUser) {
            setSuccessMessage('Пользователь успешно добавлен')

            if (this.users.length < 10) {
              this.addUsers(newUser)
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