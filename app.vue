<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NewCandidateModal
      :is-open="modal.isModalOpen.value"
      @close="modal.closeModal"
      @create="handleCreateCandidate"
    />
  </div>
</template>

<script setup lang="ts">
import { useModal } from '~/composables/useModal'
import { useNuxtApp } from '#app'

const modal = useModal()
const nuxtApp = useNuxtApp()

const handleCreateCandidate = (data: { name: string }) => {
  const state = nuxtApp.$state
  if (state.addNewCandidate) {
    state.addNewCandidate(data.name)
  }
  modal.closeModal()
}
</script>

<style>
body {
  font-family: 'Work Sans', sans-serif;
}
</style> 