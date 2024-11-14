declare module '#app' {
  interface NuxtApp {
    $state: {
      addNewCandidate: (name: string) => void
    }
  }
}

export {} 