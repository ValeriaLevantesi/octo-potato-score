import { ref } from '#imports'

// Create a singleton instance
const isModalOpen = ref(false)

export const useModal = () => {
  const openModal = () => {
    console.log('useModal: Opening modal')
    isModalOpen.value = true
  }

  const closeModal = () => {
    console.log('useModal: Closing modal')
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
} 