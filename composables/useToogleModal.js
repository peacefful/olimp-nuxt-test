import { ref } from 'vue'

export const useToogleModal = () => {
  const isOpenModal = ref(false)

  const openModal = () => {
    isOpenModal.value = true
    clearNotifications()
  }
  const closeModal = () => isOpenModal.value = false

  return { isOpenModal, openModal, closeModal }
}
