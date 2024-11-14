<template>
  <div class="w-full">
    <!-- Upload Area -->
    <div
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      class="relative cursor-pointer"
      :class="{'border-[#9747FF] bg-[#F4EBFF]': isHovering}"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        @change="handleFileSelect"
        :accept="acceptedFileTypes"
        :multiple="allowMultiple"
      />
      
      <div 
        @click="handleClick"
        @keydown.enter="handleClick"
        tabindex="0"
        role="button"
        aria-label="Upload file"
        class="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors duration-200"
        :class="[
          isHovering ? 'border-[#9747FF] bg-[#F4EBFF]' : 'border-[#E4E7EC] hover:border-[#9747FF] hover:bg-[#F4EBFF]'
        ]"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          class="mb-4"
          :class="isHovering ? 'text-[#9747FF]' : 'text-gray-400'"
        >
          <path 
            d="M12 16V8M9 11l3-3 3 3M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-base font-medium text-[#374957]">
          Click to upload or Drag and drop
        </p>
        <p class="text-sm text-gray-500 mt-1">
          Support text
        </p>
      </div>
    </div>

    <!-- File List -->
    <div v-if="files.length > 0" class="mt-4 space-y-2">
      <div 
        v-for="(file, index) in files" 
        :key="index"
        class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
      >
        <div class="flex items-center gap-2">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            class="text-gray-400"
          >
            <path 
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linejoin="round"
            />
            <path d="M14 2v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-sm text-gray-700">{{ file.name }}</span>
        </div>
        <button
          @click="handleRemoveFile(index)"
          @keydown.enter="handleRemoveFile(index)"
          class="text-gray-400 hover:text-gray-600 p-1"
          tabindex="0"
          aria-label="Remove file"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
          >
            <path 
              d="M15 5L5 15M5 5l10 10" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  acceptedFileTypes?: string
  allowMultiple?: boolean
  maxFiles?: number
}

const props = withDefaults(defineProps<Props>(), {
  acceptedFileTypes: '',
  allowMultiple: false,
  maxFiles: 1
})

const emit = defineEmits<{
  (e: 'update:files', files: File[]): void
  (e: 'error', message: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isHovering = ref(false)
const files = ref<File[]>([])

const handleClick = () => {
  fileInput.value?.click()
}

const handleDragOver = (event: DragEvent) => {
  isHovering.value = true
}

const handleDragLeave = (event: DragEvent) => {
  isHovering.value = false
}

const validateAndAddFiles = (newFiles: FileList | null) => {
  if (!newFiles) return

  const validFiles = Array.from(newFiles).filter(file => {
    if (props.acceptedFileTypes && !file.type.match(props.acceptedFileTypes)) {
      emit('error', `File type ${file.type} not accepted`)
      return false
    }
    return true
  })

  if (props.allowMultiple) {
    if (files.value.length + validFiles.length > props.maxFiles) {
      emit('error', `Maximum ${props.maxFiles} files allowed`)
      return
    }
    files.value = [...files.value, ...validFiles]
  } else {
    files.value = validFiles.slice(0, 1)
  }

  emit('update:files', files.value)
}

const handleDrop = (event: DragEvent) => {
  isHovering.value = false
  validateAndAddFiles(event.dataTransfer?.files || null)
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  validateAndAddFiles(input.files)
  input.value = '' // Reset input
}

const handleRemoveFile = (index: number) => {
  files.value = files.value.filter((_, i) => i !== index)
  emit('update:files', files.value)
}
</script> 