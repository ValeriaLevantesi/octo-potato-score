<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'create'])

const candidateName = ref('')
const websiteUrl = ref('')
const pitchFile = ref<File | null>(null)
const isDragging = ref(false)

const handleClose = () => {
  emit('close')
}

const handleCreate = () => {
  if (candidateName.value) {
    emit('create', {
      name: candidateName.value,
      website: websiteUrl.value,
      pitch: pitchFile.value
    })
    candidateName.value = ''
    websiteUrl.value = ''
    pitchFile.value = null
  }
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    pitchFile.value = input.files[0]
  }
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  if (!event.relatedTarget || !(event.currentTarget as Node).contains(event.relatedTarget as Node)) {
    isDragging.value = false
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files?.length) {
    const file = files[0]
    if (file.type === 'application/pdf') {
      pitchFile.value = file
    }
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 bg-white">
    <!-- Header -->
    <div class="h-[64px] shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] px-8 flex items-center">
      <button
        @click="handleClose"
        class="text-[#9333EA] hover:text-purple-700 transition-colors"
        aria-label="Close modal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <h2 class="text-base font-semibold text-[#374957] absolute left-1/2 -translate-x-1/2">
        New candidate
      </h2>
    </div>

    <!-- Form -->
    <div class="max-w-[600px] mx-auto p-8 pb-32">
      <form @submit.prevent="handleCreate" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-[#374957] text-base font-semibold mb-2">Name</label>
          <input
            v-model="candidateName"
            type="text"
            placeholder="Insert candidate name"
            class="w-full px-6 py-4 rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] placeholder-[#9CA3AF] text-base focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          />
        </div>

        <!-- Website -->
        <div>
          <label class="block text-[#374957] text-base font-semibold mb-2">Website</label>
          <div class="relative">
            <input
              v-model="websiteUrl"
              type="url"
              placeholder="https://www.website.com"
              class="w-full px-6 py-4 rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] placeholder-[#9CA3AF] text-base focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
            />
            <div class="absolute right-6 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#374957" stroke-width="2"/>
                <path d="M3 12H21M12 3C14.5013 5.46452 15.9228 8.66283 16 12C15.9228 15.3372 14.5013 18.5355 12 21C9.49872 18.5355 8.07725 15.3372 8 12C8.07725 8.66283 9.49872 5.46452 12 3Z" stroke="#374957" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upload pitch -->
        <div>
          <label class="block text-sm font-medium text-[#374957] mb-2">Upload pitch</label>
          <div
            class="border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200"
            :class="{
              'border-[#9333EA] bg-white opacity-50': pitchFile,
              'border-[#9333EA] bg-white': !isDragging && !pitchFile,
              'border-[#9333EA] bg-purple-50': isDragging && !pitchFile
            }"
            @dragenter="handleDragEnter"
            @dragleave="handleDragLeave"
            @dragover="handleDragOver"
            @drop="handleDrop"
          >
            <input
              type="file"
              accept=".pdf"
              class="hidden"
              @change="handleFileUpload"
              id="pitch-upload"
            />
            
            <svg class="mx-auto mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 15V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16V15" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <label
              for="pitch-upload"
              class="text-[#9333EA] hover:text-purple-700 cursor-pointer"
            >
              Click to upload
            </label>
            <span class="text-gray-500"> or Drag and drop</span>
            <p class="text-gray-400 text-sm mt-1">.pdf</p>
          </div>

          <!-- File Item -->
          <div v-if="pitchFile" class="mt-4 bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] p-6 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6C4 4.89543 4.89543 4 6 4H14L20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="#374957" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-base font-semibold text-[#374957]">{{ pitchFile.name }}</span>
            </div>
            <button 
              @click.prevent="pitchFile = null"
              class="text-[#FF3B30]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_24px_0_rgba(55,73,87,0.10)]">
      <div class="max-w-[600px] mx-auto flex justify-center h-[64px] items-center">
        <button
          type="submit"
          @click="handleCreate"
          class="inline-flex justify-center bg-[#9333EA] text-white text-base font-semibold py-2 rounded-xl hover:bg-purple-700 transition-colors shadow-[0_8px_24px_0_rgba(147,51,234,0.25)]"
        >
          <span class="px-4">Create</span>
        </button>
      </div>
    </div>
  </div>
</template>