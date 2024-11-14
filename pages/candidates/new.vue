<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="shadow-[0_8px_24px_0_rgba(55,73,87,0.10)]">
      <div class="flex items-center px-8 h-[64px] relative">
        <button
          @click="handleBack"
          class="text-[#374957] hover:text-gray-700 transition-colors"
          aria-label="Go back"
        >
          <span class="w-6 h-6 flex items-center justify-center">←</span>
        </button>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          New candidate
        </h1>
      </div>
    </header>

    <!-- Form -->
    <div class="p-8 max-w-2xl mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-[#374957] mb-2">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Insert candidate name"
          />
        </div>

        <!-- Website -->
        <div>
          <label class="block text-sm font-medium text-[#374957] mb-2">Website</label>
          <input
            v-model="form.website"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="https://www.website.com"
          />
        </div>

        <!-- Upload pitch -->
        <div>
          <label class="block text-sm font-medium text-[#374957] mb-2">Upload pitch</label>
          <div 
            class="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
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
            <div class="text-purple-600">
              <span class="font-medium">Click to upload</span>
              <span class="text-gray-500"> or Drag and drop</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">.pdf</p>
          </div>
        </div>

        <!-- Submit button -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full bg-[#9333EA] text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const router = useRouter()
const appState = useAppState()
const fileInput = ref<HTMLInputElement | null>(null)

const form = ref({
  name: '',
  website: '',
  pitch: null as File | null
})

const handleBack = () => {
  router.push('/')
}

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

const handleSubmit = () => {
  appState.addNewCandidate(form.value.name, form.value.website)
  router.push('/')
}
</script> 