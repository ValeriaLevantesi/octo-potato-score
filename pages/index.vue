<template>
  <div>
    <!-- Header -->
    <header class="shadow-[0_8px_24px_0_rgba(55,73,87,0.10)]">
      <div class="flex justify-between items-center px-8 h-[64px] relative">
        <div class="w-6"></div>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          Candidates
        </h1>
        <button
          class="w-12 h-12 flex items-center justify-center text-[#9333EA] hover:text-purple-700 transition-colors"
          aria-label="Add candidate"
          @click="router.push('/candidates/new')"
          type="button"
        >
          <span class="w-8 h-8 flex items-center justify-center text-3xl">+</span>
        </button>
      </div>
    </header>

    <!-- Candidates List -->
    <div class="p-8 flex justify-center">
      <div class="space-y-4 w-full max-w-[680px]">
        <div v-if="appState.candidates.value.length === 0" class="text-center text-gray-500 py-8">
          No candidates yet. Click the + button to add one.
        </div>
        
        <CandidateCard
          v-for="candidate in appState.candidates.value"
          :key="candidate.id"
          :id="candidate.id"
          :name="candidate.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const router = useRouter()
const appState = useAppState()
</script>