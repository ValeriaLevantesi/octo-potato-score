import { Ref } from 'vue'

export interface Candidate {
  name: string
  site: string
  pitch: File | null
}

export interface CandidateForm {
  name: string
  site: string
  pitch: File | null
}

declare module '#app' {
  interface NuxtApp {
    $state: {
      candidates: Ref<Candidate[]>
      addNewCandidate: (candidate: CandidateForm) => void
    }
  }
} 