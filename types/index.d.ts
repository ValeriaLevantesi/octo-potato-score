import { Ref } from 'vue'

export interface Candidate {
  name: string
  // ... other properties
}

declare module '#app' {
  interface NuxtApp {
    $state: {
      candidates: Ref<Candidate[]>
      addNewCandidate: (name: string) => void
    }
  }
} 