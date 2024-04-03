export const handleServerObject = (user) => {
  return {
    f: user.surname,
    i: user.name,
    o: user.middleName,
    phone: user.phone,
    city: user.city,
    address: user.address,
    birthday: user.birthday
  }
}

export const handleClientObject = (users) => {
  return users.map((user) => {
    return {
      name: user.i,
      surname: user.f,
      middlename: user.o,
      phone: user.phone,
      city: user.city,
      address: user.address,
      birthday: user.birthday
    }
  })
}

export const handleValidationObject = (user) => {
  const currentUserData = {}
  for (const iterator of Object.values(user)) {
    currentUserData[iterator.name] = iterator.value
  }

  return currentUserData
}
