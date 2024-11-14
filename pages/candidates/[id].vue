<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const visibleColumns = ref({
  criteriaLabel: true,
  criteriaId: true,
  score: true,
  field: true,
  datapoint: true,
  grounding: true
})

const handleBack = () => {
  router.push('/')
}

const toggleColumn = (column: keyof typeof visibleColumns.value) => {
  visibleColumns.value[column] = !visibleColumns.value[column]
}

const mockData = [
  {
    criteriaLabel: 'Raggiungimento della maggiore età',
    criteriaId: 'maggiore_eta',
    score: { type: 'pass', value: 'Pass' },
    field: '25',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'pass', value: 'Pass' },
    field: 'Lorem ipsum dolor sit',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_long'
  },
  {
    criteriaLabel: 'Number of slides greater than 50',
    criteriaId: 'numb_slides_50',
    score: { type: 'fail', value: 'Fail' },
    field: '16',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_very_looooooong_very'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'fail', value: 'Fail' },
    field: 'Lorem ipsum dolor sit',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'pass', value: 'Pass' },
    field: 'Lorem ipsum dolor sit',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_long'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'pass', value: 'Pass' },
    field: 'Lorem ipsum dolor sit',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_long'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'pass', value: 'Pass' },
    field: 'Lorem ipsum dolor sit',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_long'
  },
  {
    criteriaLabel: 'Lorem ipsum',
    criteriaId: 'lorem_ipsum',
    score: { type: 'fail', value: 'Fail' },
    field: 'Lorem ipsum dolor sit amet lorem',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID_very_very_very_looooooong_very'
  }
]
</script>

<template>
  <div>
    <!-- Top Bar -->
    <div class="h-[64px] shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] px-8 flex items-center justify-between">
      <button
        @click="handleBack"
        class="text-[#9333EA] hover:text-purple-700 transition-colors"
        aria-label="Go back"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <h1 class="text-base font-bold text-[#374957]">Candidate name</h1>
      
      <button
        class="text-[#9333EA] hover:text-purple-700 transition-colors"
        aria-label="Information"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/>
          <path d="M12 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 8V8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-8">
      <!-- Filters -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-[#374957] font-semibold">Show/hide:</span>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="(isVisible, column) in visibleColumns" 
              :key="column"
              class="px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
              :class="isVisible ? 'bg-purple-100 text-[#9333EA]' : 'border border-[#9333EA] text-[#9333EA]'"
              @click="toggleColumn(column)"
            >
              {{ column.toString().replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => str.toUpperCase()) }}
              <svg v-if="isVisible" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="relative">
          <input
            type="text"
            placeholder="Filter content"
            class="w-full px-6 py-4 rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] placeholder-[#9CA3AF] text-base focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
          />
          <button class="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9333EA] text-white px-6 py-2 rounded-xl">
            Filter
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="w-full">
        <div class="flex flex-col">
          <!-- Headers -->
          <div class="grid grid-cols-6 gap-4 mb-4">
            <div v-if="visibleColumns.criteriaLabel" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Criteria label</div>
              </div>
            </div>
            <div v-if="visibleColumns.criteriaId" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Criteria ID</div>
              </div>
            </div>
            <div v-if="visibleColumns.score" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Score</div>
              </div>
            </div>
            <div v-if="visibleColumns.field" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Field</div>
              </div>
            </div>
            <div v-if="visibleColumns.datapoint" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Datapoint</div>
              </div>
            </div>
            <div v-if="visibleColumns.grounding" class="col-span-1">
              <div class="bg-[#374957] rounded-xl p-4">
                <div class="text-white font-semibold text-left">Grounding</div>
              </div>
            </div>
          </div>

          <!-- Rows -->
          <div class="flex flex-col">
            <div 
              v-for="(row, index) in mockData" 
              :key="index"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-[#F5F3F5]'"
              class="grid grid-cols-6 gap-4"
            >
              <div v-if="visibleColumns.criteriaLabel" class="col-span-1 p-4">
                <div class="text-left whitespace-normal break-words">
                  {{ row.criteriaLabel }}
                </div>
              </div>
              <div v-if="visibleColumns.criteriaId" class="col-span-1 p-4">
                <div class="text-left whitespace-normal break-words">
                  {{ row.criteriaId }}
                </div>
              </div>
              <div v-if="visibleColumns.score" class="col-span-1 p-4">
                <div class="text-left">
                  <span :class="row.score.type === 'pass' ? 'text-green-500' : 'text-red-500'">
                    {{ row.score.type === 'pass' ? '✓' : '✕' }} {{ row.score.value }}
                  </span>
                </div>
              </div>
              <div v-if="visibleColumns.field" class="col-span-1 p-4">
                <div class="text-left whitespace-normal break-words">
                  {{ row.field }}
                </div>
              </div>
              <div v-if="visibleColumns.datapoint" class="col-span-1 p-4">
                <div class="text-left whitespace-normal break-words">
                  {{ row.datapoint }}
                </div>
              </div>
              <div v-if="visibleColumns.grounding" class="col-span-1 p-4">
                <div class="text-left whitespace-normal break-words">
                  {{ row.grounding }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 