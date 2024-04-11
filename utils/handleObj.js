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

export const handleClientUsers = (users) => {
  return users.map((user) => {
    return {
      id: user.id,
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

export const handleClientUser = (user) => {
  return {
    id: user.id,
    name: user.i,
    surname: user.f,
    middlename: user.o,
    phone: user.phone,
    city: user.city,
    address: user.address,
    birthday: user.birthday
  }
}

export const handleValidationObject = (user) => {
  const currentUserData = {}
  for (const iterator of Object.values(user)) {
    currentUserData[iterator.name] = iterator.value
  }

  return currentUserData
}
