export declare global {
  interface Window {
    fathom?: { trackGoal: (id: string, value: number) => {} }
  }
}
