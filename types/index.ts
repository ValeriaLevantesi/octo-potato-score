export interface Candidate {
  id: string
  name: string
  site?: string
  pitch: {
    name: string
  } | null
  score?: number
}

export interface CandidateForm {
  name: string
  site?: string
  pitch: File | null
} 