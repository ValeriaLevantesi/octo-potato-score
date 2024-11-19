<template>
  <div class="min-h-screen bg-white">
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

    <div class="pt-[64px]">
      <div class="p-6 max-w-[680px] mx-auto space-y-6 pt-8">
        <div class="space-y-2">
          <label class="block text-[#374957] font-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Insert candidate name"
            class="w-full px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-[#374957] font-medium">Website</label>
          <input
            v-model="form.site"
            type="url"
            placeholder="https://www.website.com"
            class="w-full px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-[#9747FF] font-medium">Upload pitch</label>
          <div 
            class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors"
            :class="[
              isHovering || form.pitch 
                ? 'border-[#9747FF] bg-[#F4EBFF]' 
                : 'border-[#E4E7EC] hover:border-[#9747FF] hover:bg-[#F4EBFF]'
            ]"
            @click="triggerFileInput"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleFileDrop"
          >
            <input
              ref="fileInput"
              type="file"
              accept="application/pdf,.pdf"
              class="hidden"
              @change="handleFileSelect"
            />
            
            <div v-if="!form.pitch">
              <div class="text-[#9747FF] mb-2">
                <svg class="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="text-[#9747FF] font-medium">Click to upload or Drag and drop</div>
              <div class="text-gray-400 text-sm">.pdf</div>
            </div>

            <div v-if="form.pitch">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-[#9747FF]">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span class="text-[#374957] font-medium">{{ form.pitch.name }}</span>
                </div>
                <button 
                  @click.stop="removeFile"
                  class="text-gray-400 hover:text-gray-600 p-1"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
const isHovering = ref(false)

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
  if (!input?.files?.length) return
  
  const file = input.files[0]
  if (!file.type.includes('pdf')) {
    alert('Please upload only PDF files')
    return
  }
  
  form.value.pitch = file
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleFileDrop = (event: DragEvent) => {
  event.preventDefault()
  isHovering.value = false
  const files = event.dataTransfer?.files
  if (files?.length) {
    const file = files[0]
    if (!file.type.includes('pdf')) {
      alert('Please upload only PDF files')
      return
    }
    form.value.pitch = file
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isHovering.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isHovering.value = false
}

const removeFile = () => {
  form.value.pitch = null
}

const handleCreate = () => {
  if (form.value.name.trim()) {
    appState.addNewCandidate(form.value)
    console.log('Added candidate:', form.value)
    router.push('/')
  }
}
</script> 