import type { useAppState } from '../plugins/state'

declare module 'nuxt/app' {
  interface NuxtApp {
    $appState: ReturnType<typeof useAppState>
  }
}

export {} 