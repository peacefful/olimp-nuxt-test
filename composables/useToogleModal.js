import { ref } from 'vue'

export const useToogleModal = () => {
  const usersStore = useUsersStore()
  const isOpenModal = ref(false)

  const openModal = () => {
    isOpenModal.value = true
    usersStore.successMessage = ''
  }
  const closeModal = () => (isOpenModal.value = false)

  return { isOpenModal, openModal, closeModal }
}
