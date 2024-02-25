export function isEmptyObj(errors) {
  for (const error in errors) {
    if (error) {
      return false
    }
  }
  return true
}
