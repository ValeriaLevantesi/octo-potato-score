export interface Candidate {
  id: string
  name: string
  site?: string
  pitchFileName?: string
  score?: number
}

export interface CandidateForm {
  name: string
  site: string
  pitch: File | null
} 