<template>
  <div class="min-h-screen bg-white">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
      <div class="flex items-center h-[64px] px-8 relative">
        <button 
          @click="router.push('/')"
          class="text-[#9747FF] p-2 -ml-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <h1 class="text-[#374957] text-base font-bold absolute left-1/2 -translate-x-1/2">
          {{ candidate?.name || 'Candidate Details' }}
        </h1>
      </div>
    </header>

    <!-- Content with top padding to account for fixed header -->
    <div class="pt-[64px]">
      <div class="p-6 max-w-[680px] mx-auto">
        <div v-if="candidate" class="space-y-6">
          <!-- Score Section -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="text-2xl font-bold text-center">
              {{ candidate.score || 0 }}
            </div>
            <div class="flex justify-center gap-4 mt-4">
              <button
                @click="updateScore(candidate.id, (candidate.score || 0) - 1)"
                class="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                -
              </button>
              <button
                @click="updateScore(candidate.id, (candidate.score || 0) + 1)"
                class="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <!-- Other Details -->
          <div v-if="candidate.site" class="mt-4">
            <a :href="candidate.site" target="_blank" rel="noopener noreferrer" 
               class="text-[#9747FF] hover:underline">
              {{ candidate.site }}
            </a>
          </div>
          <div v-if="candidate.pitchFileName" class="mt-4">
            <span class="text-gray-600">Pitch: {{ candidate.pitchFileName }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-8">
          Candidate not found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const route = useRoute()
const router = useRouter()
const appState = useAppState()

const candidate = computed(() => {
  return appState.candidates.value.find(c => c.id === route.params.id)
})

const updateScore = (id: string, newScore: number) => {
  appState.updateScore(id, newScore)
}
</script> 