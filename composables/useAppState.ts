import { ref } from '#imports'

interface Candidate {
  id: string
  name: string
  website?: string
}

// Create a singleton state
const candidates = ref<Candidate[]>([])

export const useAppState = () => {
  const addNewCandidate = (name: string, website?: string) => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name,
      website
    }
    candidates.value.push(newCandidate)
  }

  return {
    candidates,
    addNewCandidate
  }
} 