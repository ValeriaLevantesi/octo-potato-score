import { ref, type Ref } from '#imports'
import { defineNuxtPlugin } from 'nuxt/app'

export const useScore: Ref<number> = ref(0)
export const useScoreTotal: Ref<number> = ref(0)
export const useCurrentCandidate: Ref<string> = ref('')

export default defineNuxtPlugin(() => {
  return {
    provide: {
      score: useScore,
      scoreTotal: useScoreTotal,
      currentCandidate: useCurrentCandidate
    }
  }
})