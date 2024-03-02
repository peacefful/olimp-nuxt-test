export const handleObject = (obj) => {
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
