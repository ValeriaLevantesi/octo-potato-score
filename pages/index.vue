<template>
  <div class="min-h-screen bg-white">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
      <div class="flex justify-between items-center px-8 h-[64px] relative">
        <div class="w-6"></div>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          Candidates
        </h1>
        <button
          class="w-12 h-12 flex items-center justify-center text-[#9333EA] hover:text-purple-700 transition-colors"
          aria-label="Add candidate"
          @click="router.push('/create')"
          type="button"
        >
          <span class="w-8 h-8 flex items-center justify-center text-3xl">+</span>
        </button>
      </div>
    </header>

    <!-- Content with top padding to account for fixed header -->
    <div class="pt-[64px]">
      <div class="p-8 flex justify-center">
        <div class="space-y-4 w-full max-w-[680px]">
          <div v-if="candidates.length === 0" class="text-center text-gray-500 py-8">
            No candidates yet. Click the + button to add one.
          </div>
          
          <button
            v-for="candidate in candidates" 
            :key="candidate.id"
            @click="router.push(`/score`)"
            class="w-full p-4 bg-white rounded-lg shadow border border-gray-200 text-left
                   hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 class="text-xl font-medium text-gray-800">{{ candidate.name }}</h3>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'
import type { Candidate } from '~/types'

const router = useRouter()
const appState = useAppState()
const candidates = computed<Candidate[]>(() => appState.candidates.value)
</script>