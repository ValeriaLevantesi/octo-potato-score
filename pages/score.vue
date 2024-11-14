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
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="text-[#374957] text-base font-bold absolute left-1/2 -translate-x-1/2">
          Candidate name
        </h1>
        <button class="text-[#9747FF] w-8 h-8 flex items-center justify-center ml-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2"/>
            <rect x="11" y="11" width="2" height="7" fill="currentColor"/>
            <rect x="11" y="7" width="2" height="2" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Filter Section -->
    <div class="pt-[64px] bg-gray-50">
      <div class="p-4">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-gray-700">Show/hide:</span>
          <div class="flex flex-wrap gap-2">
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Criteria label
              <span class="text-[#9747FF]">×</span>
            </button>
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Criteria ID
              <span class="text-[#9747FF]">×</span>
            </button>
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Score
              <span class="text-[#9747FF]">×</span>
            </button>
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Field
              <span class="text-[#9747FF]">×</span>
            </button>
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Datapoint
              <span class="text-[#9747FF]">×</span>
            </button>
            <button class="px-3 py-1.5 bg-[#F4EBFF] text-[#9747FF] rounded-full text-sm flex items-center gap-1">
              Grounding
              <span class="text-[#9747FF]">×</span>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="relative">
          <input
            type="text"
            placeholder="Filter content"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm"
          />
          <button class="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9747FF] text-white px-6 py-2 rounded-lg">
            Filter
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-900 text-white">
          <tr>
            <th class="px-4 py-3 text-left">Criteria label</th>
            <th class="px-4 py-3 text-left">Criteria ID</th>
            <th class="px-4 py-3 text-left">Score</th>
            <th class="px-4 py-3 text-left">Field</th>
            <th class="px-4 py-3 text-left">Datapoint</th>
            <th class="px-4 py-3 text-left">Grounding</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(row, index) in tableData" :key="index" class="border-b border-gray-100">
            <td class="px-4 py-3">{{ row.label }}</td>
            <td class="px-4 py-3">{{ row.id }}</td>
            <td class="px-4 py-3">
              <span :class="row.score === 'Pass' ? 'text-green-500' : 'text-red-500'">
                {{ row.score }}
              </span>
            </td>
            <td class="px-4 py-3">{{ row.field }}</td>
            <td class="px-4 py-3">{{ row.datapoint }}</td>
            <td class="px-4 py-3 flex items-center justify-between">
              <span>{{ row.grounding }}</span>
              <button class="text-[#9747FF]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="2"/>
                  <rect x="11" y="11" width="2" height="7" fill="currentColor"/>
                  <rect x="11" y="7" width="2" height="2" fill="currentColor"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

const tableData = ref([
  {
    label: 'Raggiungimento della maggiore età',
    id: 'maggiore_eta',
    score: 'Pass',
    field: '25',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  // Add more rows as needed
])
</script> 