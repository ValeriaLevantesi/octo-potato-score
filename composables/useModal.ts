import { computed } from 'vue'
import { useState } from 'nuxt/app'

interface ModalState {
  isModalOpen: boolean
}

export const useModal = () => {
  const state = useState<ModalState>('modal', () => ({
    isModalOpen: false
  }))

  const openModal = () => {
    state.value.isModalOpen = true
  }

  const closeModal = () => {
    state.value.isModalOpen = false
  }

  return {
    isModalOpen: computed(() => state.value.isModalOpen),
    openModal,
    closeModal
  }
} 