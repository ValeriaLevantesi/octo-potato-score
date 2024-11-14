<template>
  <button
    @click="router.push(`/candidates/${id}`)"
    class="w-full bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] p-6 hover:shadow-lg transition-shadow text-left"
  >
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-[#374957]">{{ name }}</h2>
      <span class="w-8 h-8 flex items-center justify-center text-[#9333EA]">
        <span class="text-xl">→</span>
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from '#app'

const router = useRouter()

defineProps<{
  id: string
  name: string
}>()
</script> 