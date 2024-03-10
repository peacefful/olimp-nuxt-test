export const handleServerObject = (obj) => {
  return {
    f: obj.surname,
    i: obj.name,
    o: obj.middleName,
    phone: obj.phone,
    city: obj.city,
    address: obj.address,
    birthday: obj.birthday
  }
}

export const handleValidationObject = (userData) => {
  const currentUserData = {}
  for (const iterator of Object.values(userData)) {
    currentUserData[iterator.name] = iterator.value
  }

  return currentUserData
}