import { isEmptyObj } from '../utils/isEmptyObj'

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
          function compareStrs(a, b) {
            const str1 = a[key].toUpperCase()
            const str2 = b[key].toUpperCase()

            if (str1 < str2) return -1
            if (str1 > str2) return 1

            return 0
          }

          return state.users.sort(compareStrs)
        } else {
          return state.users
        }
      }
    }
  },
  actions: {
    async getUsers(n = 1) {
      const token = useCookie('token').value
      const BASE_URL = useRuntimeConfig().public.BASE_URL

      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(token)

        const updatedToken = useCookie('token').value

        const data = await $fetch(`${BASE_URL}/records?page=${n}`, {
          headers: { Authorization: `Bearer ${updatedToken}` }
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
      const token = useCookie('token').value
      const BASE_URL = useRuntimeConfig().public.BASE_URL

      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(token)

        const updatedToken = useCookie('token').value

        const data = await $fetch(`${BASE_URL}/records/${id}`, {
          headers: { Authorization: `Bearer ${updatedToken}` }
        })

        data ? (this.user = data) : null
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id, index) {
      const token = useCookie('token').value
      const BASE_URL = useRuntimeConfig().public.BASE_URL

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(token)

        const updatedToken = useCookie('token').value

        const deleteUser = await $fetch(`${BASE_URL}/records/${id}`, {
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
      const token = useCookie('token').value
      const BASE_URL = useRuntimeConfig().public.BASE_URL

      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(token)

        const updatedToken = useCookie('token').value

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
          const user = await $fetch(`${BASE_URL}/records`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${updatedToken}` },
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
      const token = useCookie('token').value
      const BASE_URL = useRuntimeConfig().public.BASE_URL

      this.successMessage = ''

      try {
        const authorizationStore = useAuthorizationStore()
        await authorizationStore.refreshToken(token)

        const updatedToken = useCookie('token').value

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
          const editUser = await $fetch(`${BASE_URL}/records/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${updatedToken}` },
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
