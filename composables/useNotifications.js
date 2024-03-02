export const successMessage = ref('')
export const errorMessage = ref('')

export const setSuccessMessage = (text) => {
  successMessage.value = text
}

export const setErrorMessage = (text) => {
  errorMessage.value = text
}

export const clearNotifications = () => {
  successMessage.value = ''
  errorMessage.value = ''
}