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

export const handleClientUsers = (data) => {
  if (Array.isArray(data)) {
    return data.map((user) => {
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

  return {
    id: data.id,
    name: data.i,
    surname: data.f,
    middlename: data.o,
    phone: data.phone,
    city: data.city,
    address: data.address,
    birthday: data.birthday
  }
}

export const handleValidationObject = (user) => {
  const currentUserData = {}
  for (const iterator of Object.values(user)) {
    currentUserData[iterator.name] = iterator.value
  }

  return currentUserData
}
