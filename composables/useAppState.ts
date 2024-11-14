import { useState } from 'nuxt/app'

interface Candidate {
  id: string
  name: string
  status?: string
  isProcessing: boolean
}

interface State {
  candidates: Candidate[]
}

export const useAppState = () => {
  const state = useState<State>('app-state', () => ({
    candidates: []
  }))

  const addNewCandidate = (name: string) => {
    const newCandidate: Candidate = {
      id: crypto.randomUUID(),
      name,
      isProcessing: false
    }
    state.value.candidates.push(newCandidate)
  }

  const addCandidate = (candidate: Candidate) => {
    state.value.candidates.push(candidate)
  }

  return {
    state,
    addNewCandidate,
    addCandidate
  }
} 