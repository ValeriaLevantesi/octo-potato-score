<template>
  <div class="min-h-screen bg-white" @click="closePopover">
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
      <div class="flex justify-between items-center px-8 h-[64px] relative">
        <button 
          @click="router.push('/')"
          class="text-[#9747FF] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#F5F3F5] transition-colors duration-200 disabled:opacity-50"
          :class="{ 'active:bg-[#F5F3F5] active:text-[#260849]': !disabled }"
          aria-label="Go back"
          :disabled="disabled"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          {{ candidate?.name }}
        </h1>
        <button 
          class="text-[#9747FF] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#F5F3F5] transition-colors duration-200 disabled:opacity-50"
          :class="{ 
            'bg-[#F4EDFD]': showInfo,
            'active:bg-[#F5F3F5] active:text-[#260849]': !disabled 
          }"
          aria-label="Information"
          @click="toggleInfo"
          :disabled="disabled"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="p-6 pt-[72px]">
      <!-- Filters -->
      <div class="mb-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-sm text-[#374957]">Show/hide:</span>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="column in columns" 
              :key="column.id"
              @click="toggleColumn(column.id)"
              :class="[
                'px-3 py-1.5 rounded-full text-sm flex items-center gap-1',
                column.visible 
                  ? 'bg-[#F3E8FF] text-[#9747FF]' 
                  : 'bg-[#F5F3F5] text-[#374957]'
              ]"
            >
              {{ column.label }}
              <svg 
                v-if="column.visible"
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="flex gap-4">
          <input 
            type="text" 
            placeholder="Filter content"
            class="flex-1 rounded-lg border border-[#E5E7EB] px-4 py-2 text-[#374957] focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:border-transparent"
          >
          <button class="px-6 py-2 bg-[#9747FF] text-white rounded-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Table Headers -->
      <div class="flex gap-2 mb-2">
        <div 
          v-for="column in columns" 
          :key="column.id"
          v-show="column.visible"
          :class="[
            'bg-[#2A2A2A] text-white px-6 py-4 rounded-2xl',
            column.id === 'score' ? 'w-[120px]' : 'flex-1'
          ]"
        >
          {{ column.label }}
        </div>
      </div>

      <!-- Table Rows -->
      <div class="space-y-[1px]">
        <div 
          v-for="(row, index) in tableData" 
          :key="index"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-[#F5F3F5]'"
          class="flex gap-2 px-6 py-4"
        >
          <div v-if="columns[0].visible" class="flex-1">{{ row.criteriaLabel }}</div>
          <div v-if="columns[1].visible" class="flex-1">{{ row.criteriaId }}</div>
          <div v-if="columns[2].visible" class="w-[120px]">
            <span :class="row.score === 'Pass' ? 'text-green-500' : 'text-red-500'" class="flex items-center gap-1">
              <svg v-if="row.score === 'Pass'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ row.score }}
            </span>
          </div>
          <div v-if="columns[3].visible" class="flex-1">{{ row.field }}</div>
          <div v-if="columns[4].visible" class="flex-1">{{ row.datapoint }}</div>
          <div v-if="columns[5].visible" class="flex-1 flex items-center justify-between">
            {{ row.grounding }}
            <div class="relative">
              <button 
                class="text-[#9747FF] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3F5] transition-colors duration-200 disabled:opacity-50"
                :class="{ 
                  'bg-[#F4EDFD]': activePopover === index,
                  'active:bg-[#F5F3F5] active:text-[#260849]': !disabled 
                }"
                @click.stop="togglePopover(index)"
                :disabled="disabled"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 5.33334H8.00667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.33325 8H7.99992V10.6667H8.66659" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <Popover :visible="activePopover === index">
                <div>
                  <p>Details about {{ row.grounding }}</p>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'
import Popover from '~/components/Popover.vue'

const route = useRoute()
const router = useRouter()
const appState = useAppState()

const candidate = computed(() => 
  appState.candidates.value.find(c => c.id === route.params.id)
)

const activePopover = ref<number | null>(null)

const togglePopover = (index: number) => {
  activePopover.value = activePopover.value === index ? null : index
}

const closePopover = () => {
  activePopover.value = null
}

const columns = ref([
  { id: 'criteriaLabel', label: 'Criteria label', visible: true },
  { id: 'criteriaId', label: 'Criteria ID', visible: true },
  { id: 'score', label: 'Score', visible: true },
  { id: 'field', label: 'Field', visible: true },
  { id: 'datapoint', label: 'Datapoint', visible: true },
  { id: 'grounding', label: 'Grounding', visible: true }
])

const toggleColumn = (columnId: string) => {
  const column = columns.value.find(col => col.id === columnId)
  if (column) {
    column.visible = !column.visible
  }
}

const tableData = ref([
  {
    criteriaLabel: 'Number of slides greater than 50',
    criteriaId: 'slides_count_50',
    score: 'Fail',
    field: '16',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Business model clearly defined',
    criteriaId: 'business_model',
    score: 'Pass',
    field: 'Revenue streams identified',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Market size analysis present',
    criteriaId: 'market_size',
    score: 'Pass',
    field: 'TAM SAM SOM',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Financial projections included',
    criteriaId: 'financials',
    score: 'Pass',
    field: '5-year forecast',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Competitive analysis',
    criteriaId: 'competition',
    score: 'Pass',
    field: 'Market positioning',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Team background detailed',
    criteriaId: 'team_background',
    score: 'Fail',
    field: 'Missing experience',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Go-to-market strategy',
    criteriaId: 'gtm_strategy',
    score: 'Pass',
    field: 'Channel strategy',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Product development roadmap',
    criteriaId: 'product_roadmap',
    score: 'Pass',
    field: '18-month plan',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Investment ask specified',
    criteriaId: 'investment_ask',
    score: 'Pass',
    field: '€2.5M Series A',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Use of funds detailed',
    criteriaId: 'use_of_funds',
    score: 'Pass',
    field: 'Allocation plan',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Customer acquisition cost',
    criteriaId: 'cac_metrics',
    score: 'Fail',
    field: 'Missing metrics',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Customer lifetime value',
    criteriaId: 'ltv_analysis',
    score: 'Pass',
    field: 'Retention data',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Technical architecture',
    criteriaId: 'tech_stack',
    score: 'Pass',
    field: 'Stack overview',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Intellectual property',
    criteriaId: 'ip_protection',
    score: 'Fail',
    field: 'No patents',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Growth metrics',
    criteriaId: 'growth_rate',
    score: 'Pass',
    field: '150% YoY',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Unit economics',
    criteriaId: 'unit_economics',
    score: 'Pass',
    field: 'Positive margin',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Market validation',
    criteriaId: 'market_proof',
    score: 'Pass',
    field: 'Early adopters',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Risk assessment',
    criteriaId: 'risk_analysis',
    score: 'Fail',
    field: 'Incomplete',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Scalability potential',
    criteriaId: 'scalability',
    score: 'Pass',
    field: 'Global market',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  },
  {
    criteriaLabel: 'Exit strategy',
    criteriaId: 'exit_plan',
    score: 'Pass',
    field: 'M&A targets',
    datapoint: 'Datapoint_ID',
    grounding: 'Datasource_ID'
  }
])

// Add this to control the disabled state
const disabled = computed(() => {
  // Add your condition here
  return false
})

// Redirect if candidate not found
if (!candidate.value) {
  router.push('/')
}

const showInfo = ref(false)
const toggleInfo = () => {
  showInfo.value = !showInfo.value
}
</script> 