<template>
  <div class="min-h-screen bg-white">
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
      <div class="flex justify-between items-center px-8 h-[64px] relative">
        <button 
          @click="router.push('/')"
          class="text-[#9747FF] p-2 -ml-2"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          {{ candidate?.name }}
        </h1>
        <div class="w-6"></div>
      </div>
    </header>

    <div class="p-6 pt-24">
      <!-- Add your candidate score content here -->
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

const candidate = computed(() => 
  appState.candidates.value.find(c => c.id === route.params.id)
)

// Redirect if candidate not found
if (!candidate.value) {
  router.push('/')
}
</script> 