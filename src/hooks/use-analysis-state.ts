import { useLocalStorage } from "./use-local-storage"

export function useAnalysisState() {
  const [hasRunAnalysis, setHasRunAnalysis] = useLocalStorage<boolean>("has-run-analysis", false)

  const completeAnalysis = () => {
    setHasRunAnalysis(true)
  }

  return {
    hasRunAnalysis,
    completeAnalysis
  }
}
