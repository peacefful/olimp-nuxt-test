export const useUsersFiltering = defineStore('usersFiltering', {
  state: () => ({
    filter: [
      { title: 'Фамилия', value: '', type: 'text', key: 'surname' },
      { title: 'Имя', value: '', type: 'text', key: 'name' },
      { title: 'Отчество', value: '', type: 'text', key: 'middlename' },
      { title: 'Город', value: '', type: 'text', key: 'city' },
      { title: 'Адрес', value: '', type: 'text', key: 'address' },
      { title: 'Дата рождения', value: '', type: 'date', key: 'birthday' },
      { title: 'Номер телефона', value: '', type: 'text', key: 'phone' }
    ]
  }),
  actions: {
    searchUser(users) {
      return users.filter((user) => {
        return this.filter.every((filter) => {
          const userValue = user[filter.key].toString().toLowerCase()
          const filterValue = filter.value.toString().toLowerCase()
          return userValue.includes(filterValue)
        })
      })
    }
  }
})
