<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NewCandidateModal
      :is-open="isModalOpen"
      @close="closeModal"
      @create="handleCreateCandidate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModal } from '~/composables/useModal'
import { useAppState } from '~/composables/useAppState'

const { isModalOpen, closeModal } = useModal()
const { addNewCandidate } = useAppState()

const handleCreateCandidate = (data: { name: string }) => {
  addNewCandidate(data.name)
  closeModal()
}
</script>

<style>
body {
  font-family: 'Work Sans', sans-serif;
}
</style> 