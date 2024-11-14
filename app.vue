<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NewCandidateModal
      :is-open="isModalOpen"
      @close="handleCloseModal"
      @create="handleCreateCandidate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from '#imports'
import type { Ref } from 'vue'
import { useModal } from '~/composables/useModal'
import { useAppState } from '~/composables/useAppState'

interface ModalComposable {
  isModalOpen: Ref<boolean>
  closeModal: () => void
}

interface AppStateComposable {
  addNewCandidate: (name: string) => void
}

const modal = useModal() as ModalComposable
const appState = useAppState() as AppStateComposable

const isModalOpen = computed(() => modal.isModalOpen.value)

const handleCloseModal = () => {
  console.log('Closing modal')
  modal.closeModal()
}

const handleCreateCandidate = (data: { name: string }) => {
  console.log('Creating candidate:', data.name)
  appState.addNewCandidate(data.name)
  modal.closeModal()
}
</script>

<style>
body {
  font-family: 'Work Sans', sans-serif;
}
</style> 