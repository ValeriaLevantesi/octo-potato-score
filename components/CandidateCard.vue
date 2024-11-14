<script setup lang="ts">
import { useRouter } from 'nuxt/app'

interface CandidateProps {
  name: string
  status?: string
  isProcessing?: boolean
}

const props = defineProps<CandidateProps>()
const router = useRouter()

const handleClick = () => {
  if (props.isProcessing) return
  router.push('/candidates/1')
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.isProcessing) return
  if (event.key === 'Enter' || event.key === ' ') {
    handleClick()
  }
}
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] flex justify-between items-center"
    :class="{
      'cursor-pointer p-6': !isProcessing,
      'cursor-default px-6 h-[72px]': isProcessing
    }"
    :tabindex="isProcessing ? -1 : 0"
    :role="isProcessing ? 'none' : 'button'"
    :aria-label="!isProcessing ? `View details for candidate ${name}` : undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <div>
      <h3 class="text-base font-semibold text-[#374957]">{{ name }}</h3>
      <p 
        v-if="status" 
        class="text-xs text-[#FFAF32] mt-1"
      >
        {{ status }}
      </p>
    </div>
    <svg v-if="!isProcessing" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template> 