import { isEmptyObj } from '../utils/isEmptyObj'
import { compareStrings } from '../utils/compareStrings'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [],
    user: {},
    pagination: {},

    successMessage: '',
    errorMessage: '',

    token: useCookie('token').value,
    baseUrl: useRuntimeConfig().public.BASE_URL
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
        await authorizationStore.refreshToken(this.token)

        this.token = useCookie('token').value

        const data = await $fetch(`${this.baseUrl}/records?page=${n}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })

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
        await authorizationStore.refreshToken(this.token)

        this.token = useCookie('token').value

        const data = await $fetch(`${this.baseUrl}/records/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })

        data ? (this.user = data) : null
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id, index) {
      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(this.token)

        this.token = useCookie('token').value

        const deleteUser = await $fetch(`${this.baseUrl}/records/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${updatedToken}` }
        })

        if (deleteUser) {
          this.users.splice(index, 1)
          this.successMessage = 'Пользователь удален'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(surname, name, middleName, phone, city, address, birthday, errors, id = null) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(this.token)

        this.token = useCookie('token').value

        const data = {
          f: surname,
          i: name,
          o: middleName,
          phone: phone,
          city: city,
          address: address,
          birthday: birthday
        }

        if (isEmptyObj(errors) && !isEmptyObj(data)) {
          const user = await $fetch(`${this.baseUrl}/records`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` },
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
    async editUser(surname, name, middleName, phone, city, address, birthday, errors, id = null) {
      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(this.token)

        this.token = useCookie('token').value

        const data = {
          f: surname,
          i: name,
          o: middleName,
          phone: phone,
          city: city,
          address: address,
          birthday: birthday
        }

        if (isEmptyObj(errors) && !isEmptyObj(data)) {
          const editUser = await $fetch(`${this.baseUrl}/records/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${this.token}` },
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
