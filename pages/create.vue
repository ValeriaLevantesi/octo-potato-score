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
          New candidate
        </h1>
      </div>
    </header>

    <!-- Content with top padding to account for fixed header -->
    <div class="pt-[64px]">
      <div class="p-6 max-w-[680px] mx-auto space-y-6">
        <!-- Name Field -->
        <div class="space-y-2">
          <label class="block text-[#374957] font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Insert candidate name"
            class="w-full px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <!-- Website Field -->
        <div class="space-y-2">
          <label class="block text-[#374957] font-medium">Website</label>
          <div class="relative">
            <input
              v-model="form.site"
              type="url"
              placeholder="https://www.website.com"
              class="w-full px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upload Pitch -->
        <div class="space-y-2">
          <label class="block text-[#9747FF] font-medium">Upload pitch</label>
          <div 
            class="border-2 border-dashed border-[#9747FF] rounded-2xl p-8 text-center cursor-pointer hover:bg-purple-50 transition-colors"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="handleFileDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".pdf"
              class="hidden"
              @change="handleFileSelect"
            />
            <div class="text-[#9747FF] mb-2">
              <svg class="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="text-[#9747FF] font-medium">Click to upload or Drag and drop</div>
            <div class="text-gray-400 text-sm">.pdf</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Button -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="p-4 flex justify-center">
        <button 
          @click="handleCreate"
          class="bg-[#9747FF] hover:bg-[#8A3EFF] text-white rounded-xl 
                 transition-colors font-medium text-base h-12 px-4
                 inline-flex items-center justify-center min-w-[120px]
                 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!form.name"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'
import type { CandidateForm } from '~/types'

const router = useRouter()
const appState = useAppState()
const fileInput = ref<HTMLInputElement | null>(null)

const form = ref<CandidateForm>({
  name: '',
  site: '',
  pitch: null
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    form.value.pitch = input.files[0]
  }
}

const handleFileDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files?.length) {
    form.value.pitch = files[0]
  }
}

const handleCreate = () => {
  if (form.value.name.trim()) {
    appState.addNewCandidate(form.value)
    router.push('/')
  }
}
</script> 