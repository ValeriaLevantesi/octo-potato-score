import { ref } from '#imports'
import type { Candidate, CandidateForm } from '~/types'

const candidates = ref<Candidate[]>([])
let nextId = 1

export const useAppState = () => {
  const addNewCandidate = (data: CandidateForm) => {
    candidates.value.push({
      id: `candidate-${nextId++}`,
      name: data.name,
      site: data.site,
      pitchFileName: data.pitch?.name,
      score: 0
    })
  }

  const updateScore = (id: string, score: number) => {
    const candidate = candidates.value.find(c => c.id === id)
    if (candidate) {
      candidate.score = score
    }
  }

  return {
    candidates,
    addNewCandidate,
    updateScore
  }
} 