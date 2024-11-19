<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-[680px] mx-auto p-6">
      <!-- Fixed Header -->
      <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
        <div class="flex justify-between items-center px-8 h-[64px] relative">
          <div class="w-6"></div>
          <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
            Candidates
          </h1>
          <button
            class="text-[#9747FF] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#F5F3F5] transition-colors duration-200 disabled:opacity-50"
            :class="{ 'active:bg-[#F5F3F5] active:text-[#260849]': !disabled }"
            aria-label="Add candidate"
            @click="router.push('/create-candidate')"
            :disabled="disabled"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div class="pt-8 space-y-4">
        <button
          v-for="candidate in candidates" 
          :key="candidate.id"
          @click="router.push(`/score/${candidate.id}`)"
          class="w-full bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <span class="text-[#374957] text-base font-medium">{{ candidate.name }}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#9747FF]">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const router = useRouter()
const appState = useAppState()
const disabled = ref(false)

const candidates = computed(() => {
  console.log('Current candidates:', appState.candidates.value)
  return appState.candidates.value
})
</script>