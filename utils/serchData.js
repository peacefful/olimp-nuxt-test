export const searchUser = (users, filter) => {
  return users.filter((user) => {
    return filter.every((filter) => {
      const userValue = user[filter.key].toString().toLowerCase()
      const filterValue = filter.value.toString().toLowerCase()
      return userValue.includes(filterValue)
    })
  })
}
