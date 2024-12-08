<template>
  <div 
    class="min-h-screen bg-white" 
    @click="closePopover"
  >
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-20">
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
        <div class="flex items-center gap-4 mb-6 flex-wrap">
          <span class="text-[14px] font-['Work_Sans'] text-[#374957] font-normal">Show/Hide:</span>
          <div class="flex gap-2 flex-wrap">
            <div
              v-for="column in columns"
              :key="column.id"
              @click="toggleColumnVisibility(column.id)"
              class="h-[32px] px-4 rounded-[8px] cursor-pointer transition-colors duration-200 flex items-center gap-2 border border-[#9747FF] shrink-0 text-[#2A2A2A]"
              :class="column.visible 
                ? 'bg-[#F4EDFD]' 
                : 'bg-[#F5F3F5]'"
            >
              <span class="text-[14px] font-['Work_Sans'] font-normal whitespace-nowrap">{{ column.label }}</span>
              <svg 
                v-if="column.visible" 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="mt-[1px] shrink-0 text-[#9747FF]"
              >
                <path 
                  d="M9 3L3 9M3 3L9 9" 
                  stroke="currentColor" 
                  stroke-width="1.5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </div>
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

      <!-- Table container with sticky headers -->
      <div class="relative">
        <!-- Sticky Headers -->
        <div class="sticky top-[64px] bg-white z-10 pb-2">
          <div class="flex gap-2 mb-2 relative select-none">
            <div 
              v-for="(column, index) in columns" 
              :key="column.id"
              v-show="column.visible"
              class="relative" 
              :style="{ 
                flex: `${columnWidths[index].width} 1 0`,
                minWidth: '100px'
              }"
            >
              <div 
                class="bg-[#2A2A2A] text-white h-[48px] flex items-center rounded-[8px] w-full pl-6 pr-6"
              >
                {{ column.label }}
              </div>
              
              <!-- Resize handle -->
              <div
                v-if="index < columns.length - 1"
                class="absolute top-0 right-[-6px] w-3 h-full cursor-col-resize z-10 hover:bg-[#9747FF]/20 group"
                @mousedown="startResize($event, index)"
              >
                <div class="hidden group-hover:block absolute right-[5px] top-0 w-[2px] h-full bg-[#9747FF]/50"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable Table Body -->
        <div class="space-y-[1px]">
          <div 
            v-for="(row, rowIndex) in tableData" 
            :key="rowIndex"
            :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F5F3F5]'"
            class="flex gap-2 px-6 py-4"
          >
            <div 
              v-for="(column, colIndex) in columns"
              :key="column.id"
              v-show="column.visible"
              class="pl-6 pr-6 break-words"
              :style="{ 
                flex: `${columnWidths[colIndex].width} 1 0`,
                minWidth: '100px'
              }"
            >
              <!-- Column content -->
              <template v-if="column.id === 'score'">
                <div :class="[
                  'px-2 py-1 rounded-full text-sm inline-flex items-center',
                  row.score === 'Pass' 
                    ? 'bg-[#DCFCE7] text-[#166534]' 
                    : 'bg-[#FEE2E2] text-[#991B1B]'
                ]">
                  {{ row.score }}
                </div>
              </template>
              <template v-else-if="column.id === 'grounding'">
                <div class="flex items-center justify-between w-full">
                  <span class="break-words mr-2">{{ row[column.id as keyof TableRow] }}</span>
                  <div class="relative flex-shrink-0">
                    <button 
                      class="text-[#9747FF] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F3F5] transition-colors duration-200"
                      :class="{ 
                        'bg-[#F4EDFD]': activePopover === rowIndex,
                      }"
                      @click.stop="togglePopover(rowIndex)"
                      aria-label="Show details"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 5.33334H8.00667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.33325 8H7.99992V10.6667H8.66659" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>

                    <!-- Popover -->
                    <div 
                      v-if="activePopover === rowIndex"
                      class="fixed transform translate-x-[-100%] mt-2 bg-white rounded-lg shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-[9999] min-w-[300px] border border-[#E5E7EB]"
                      @click.stop
                    >
                      <div class="p-4">
                        <h3 class="font-medium text-[#374957] mb-2">Source Details</h3>
                        <div class="text-sm text-[#374957] space-y-2">
                          <p>Source ID: {{ row[column.id as keyof TableRow] }}</p>
                          <p>Additional details can go here...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <span class="break-words">{{ row[column.id as keyof TableRow] }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const route = useRoute()
const router = useRouter()
const appState = useAppState()

const candidate = computed(() => 
  appState.candidates.value.find(c => c.id === route.params.id)
)

// Replace the Map with a single number or null state
const activePopover = ref<number | null>(null)

// Update toggle function
const togglePopover = (rowIndex: number) => {
  // If clicking the same popover, close it
  if (activePopover.value === rowIndex) {
    activePopover.value = null
  } else {
    // If clicking a different popover, close the old one and open the new one
    activePopover.value = rowIndex
  }




}

// Update close function
const closePopover = () => {
  activePopover.value = null
}

// Add these type definitions at the top of your script
type ColumnId = 'criteriaLabel' | 'criteriaId' | 'score' | 'field' | 'datapoint' | 'grounding'

interface TableRow {
  criteriaLabel: string
  criteriaId: string
  score: 'Pass' | 'Fail'
  field: string
  datapoint: string
  grounding: string
}

interface Column {
  id: ColumnId
  label: string
  visible: boolean
}

interface ColumnWidth {
  id: ColumnId
  width: number
}

// Update your refs with the new types
const columns = ref<Column[]>([
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

const tableData = ref<TableRow[]>([
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

// Update the resize handlers
const isResizing = ref(false)
const currentResizer = ref<number | null>(null)
const startX = ref(0)
const startWidths = ref<number[]>([])

// Initialize column widths
const columnWidths = ref<ColumnWidth[]>([
  { id: 'criteriaLabel', width: 1 },
  { id: 'criteriaId', width: 1 },
  { id: 'score', width: 0.8 },
  { id: 'field', width: 1 },
  { id: 'datapoint', width: 1 },
  { id: 'grounding', width: 1 }
])

// Update resize handlers
const handleResize = (event: MouseEvent) => {
  if (!isResizing.value || currentResizer.value === null) return
  
  const diff = event.pageX - startX.value
  const totalWidth = window.innerWidth
  const ratio = diff / totalWidth

  // Get current and next column
  const currentColumn = columnWidths.value[currentResizer.value]
  const nextColumn = columnWidths.value[currentResizer.value + 1]

  if (currentColumn && nextColumn) {
    const totalFlex = startWidths.value[currentResizer.value] + startWidths.value[currentResizer.value + 1]
    
    // Calculate new widths ensuring minimum flex values
    let newCurrentWidth = Math.max(0.2, startWidths.value[currentResizer.value] + ratio * 2)
    let newNextWidth = Math.max(0.2, startWidths.value[currentResizer.value + 1] - ratio * 2)
    
    // Update the widths
    columnWidths.value[currentResizer.value].width = newCurrentWidth
    columnWidths.value[currentResizer.value + 1].width = newNextWidth
  }
}

const startResize = (event: MouseEvent, index: number) => {
  isResizing.value = true
  currentResizer.value = index
  startX.value = event.pageX
  
  // Store all current widths
  startWidths.value = columnWidths.value.map(col => col.width)
  
  // Add event listeners
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

const stopResize = () => {
  isResizing.value = false
  currentResizer.value = null
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

// Add click outside handler to close popover
onMounted(() => {
  document.addEventListener('click', closePopover)
})

onUnmounted(() => {
  document.removeEventListener('click', closePopover)
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
})

// Add a computed property to count visible columns
const visibleColumnsCount = computed(() => 
  columns.value.filter(col => col.visible).length
)

// Update the toggle visibility function
const toggleColumnVisibility = (columnId: string) => {
  const columnIndex = columns.value.findIndex(col => col.id === columnId)
  if (columnIndex === -1) return
  
  if (columns.value[columnIndex].visible && visibleColumnsCount.value <= 1) {
    return
  }

  columns.value[columnIndex].visible = !columns.value[columnIndex].visible
}
</script>

<style scoped>
/* Add these styles to prevent text selection while resizing */
.select-none {
  user-select: none;
}

/* Optional: Add transition for smooth width changes */
.transition-width {
  transition: width 0.1s ease;
}
</style> 