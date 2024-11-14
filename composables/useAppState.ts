import { ref } from 'vue'
import type { Candidate, CandidateForm } from '~/types'

// Create a single instance of the state
const candidates = ref<Candidate[]>([])

export const useAppState = () => {
  const addNewCandidate = (candidate: CandidateForm) => {
    candidates.value.push({
      id: crypto.randomUUID(),
      name: candidate.name,
      site: candidate.site,
      pitch: candidate.pitch ? { name: candidate.pitch.name } : null
    })
  }

  return {
    candidates,
    addNewCandidate
  }
} 