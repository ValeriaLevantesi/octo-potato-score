import { defineNuxtPlugin } from 'nuxt/app'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface Candidate {
  id: string;
  name: string;
  status?: string;
  isProcessing: boolean;
}

interface State {
  candidates: Ref<Candidate[]>;
  addNewCandidate: (name: string) => void;
}

export default defineNuxtPlugin(() => {
  const candidates = ref<Candidate[]>([
    {
      id: 'startup',
      name: 'Startup',
      isProcessing: false // candidato attivo
    }
  ])

  const state: State = {
    candidates,
    addNewCandidate: (name: string) => {
      candidates.value.push({
        id: crypto.randomUUID(),
        name,
        status: 'In lavorazione',
        isProcessing: true
      })
    }
  }

  return {
    provide: {
      state
    }
  }
}) 