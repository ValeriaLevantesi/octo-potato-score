<template>
  <div>
    <!-- Header -->
    <header class="shadow-[0_8px_24px_0_rgba(55,73,87,0.10)]">
      <div class="flex justify-between items-center px-8 h-[64px]">
        <button
          @click="handleBack"
          class="text-[#9333EA] hover:text-purple-700 transition-colors"
          aria-label="Go back"
        >
          <span class="w-6 h-6 flex items-center justify-center">←</span>
        </button>
        <h1 class="font-bold text-[#374957] text-base leading-none">
          {{ candidateName }}
        </h1>
        <button
          class="text-[#9333EA] hover:text-purple-700 transition-colors"
          aria-label="Information"
        >
          <span class="w-6 h-6 flex items-center justify-center">i</span>
        </button>
      </div>
    </header>

    <!-- Filters -->
    <div class="bg-gray-50 px-8 py-4">
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="text-sm text-gray-600">Show/hide:</span>
        <button
          v-for="(visible, column) in visibleColumns"
          :key="column"
          @click="toggleColumn(column)"
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
        >
          {{ formatColumnName(column) }}
          <span class="text-xs">×</span>
        </button>
      </div>

      <!-- Search -->
      <div class="relative">
        <input
          type="text"
          v-model="filterText"
          placeholder="Filter content"
          class="w-full px-4 py-2 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9333EA] text-white px-4 py-1 rounded-lg"
        >
          Filter
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="p-8">
      <table class="w-full border-separate border-spacing-0">
        <thead>
          <tr class="bg-gray-900 text-white">
            <th v-if="visibleColumns.criteriaLabel" class="p-4 text-left rounded-l-lg">Criteria label</th>
            <th v-if="visibleColumns.criteriaId" class="p-4 text-left">Criteria ID</th>
            <th v-if="visibleColumns.score" class="p-4 text-left">Score</th>
            <th v-if="visibleColumns.field" class="p-4 text-left">Field</th>
            <th v-if="visibleColumns.datapoint" class="p-4 text-left">Datapoint</th>
            <th v-if="visibleColumns.grounding" class="p-4 text-left rounded-r-lg">Grounding</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredData" :key="index" class="hover:bg-gray-50">
            <td v-if="visibleColumns.criteriaLabel" class="p-4 border-b">{{ row.criteriaLabel }}</td>
            <td v-if="visibleColumns.criteriaId" class="p-4 border-b">{{ row.criteriaId }}</td>
            <td v-if="visibleColumns.score" class="p-4 border-b">
              <span :class="row.score === 'Pass' ? 'text-green-500' : 'text-red-500'">
                {{ row.score }}
              </span>
            </td>
            <td v-if="visibleColumns.field" class="p-4 border-b">{{ row.field }}</td>
            <td v-if="visibleColumns.datapoint" class="p-4 border-b">{{ row.datapoint }}</td>
            <td v-if="visibleColumns.grounding" class="p-4 border-b flex items-center gap-2">
              {{ row.grounding }}
              <button class="text-[#9333EA]" aria-label="More information">
                <span class="w-4 h-4 flex items-center justify-center">i</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from '#imports'
import { useRouter } from '#app'

const router = useRouter()
const candidateName = ref('Candidate name')
const filterText = ref('')

const visibleColumns = ref({
  criteriaLabel: true,
  criteriaId: true,
  score: true,
  field: true,
  datapoint: true,
  grounding: true
})

const data = ref([
  {
    criteriaLabel: 'Raggiungimento della maggiore età',
    criteriaId: 'maggiore_eta',
    score: 'Pass',
    field: '25',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  // Add more sample data here
])

const filteredData = computed(() => {
  if (!filterText.value) return data.value
  const search = filterText.value.toLowerCase()
  return data.value.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(search)
    )
  )
})

const toggleColumn = (column: string) => {
  visibleColumns.value[column] = !visibleColumns.value[column]
}

const formatColumnName = (column: string) => {
  return column
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

const handleBack = () => {
  router.push('/')
}
</script> 