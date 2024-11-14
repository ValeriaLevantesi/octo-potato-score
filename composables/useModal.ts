import { ref, provide, inject, type InjectionKey, Ref } from 'vue'

interface ModalStore {
  isModalOpen: Ref<boolean>
  openModal: () => void
  closeModal: () => void
}

const MODAL_KEY = Symbol() as InjectionKey<ModalStore>

export const useModal = () => {
  const existing = inject(MODAL_KEY)
  if (existing) return existing

  const isModalOpen = ref(false)

  const openModal = () => {
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  const modal: ModalStore = {
    isModalOpen,
    openModal,
    closeModal,
  }

  provide(MODAL_KEY, modal)
  return modal
} 