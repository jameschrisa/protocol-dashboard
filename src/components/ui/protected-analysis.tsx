import { Navigate } from "react-router-dom"
import { useAnalysisState } from "../../hooks/use-analysis-state"

interface ProtectedAnalysisProps {
  children: React.ReactNode
}

export function ProtectedAnalysis({ children }: ProtectedAnalysisProps) {
  const { hasRunAnalysis } = useAnalysisState()

  if (!hasRunAnalysis) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
