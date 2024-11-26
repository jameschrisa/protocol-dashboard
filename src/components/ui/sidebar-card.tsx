import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Upload, Video } from "lucide-react"
import { useState, useRef } from "react"
import { AnalysisDialog } from "./analysis-dialog"

interface SidebarCardProps {
  onUpload: (file: File) => void
  onAnalyze: () => void
}

export function SidebarCard({ onUpload, onAnalyze }: SidebarCardProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      onUpload(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleAnalyzeClick = () => {
    setShowAnalysis(true)
  }

  const handleDialogClose = (open: boolean) => {
    setShowAnalysis(open)
    if (!open) {
      onAnalyze()
    }
  }

  return (
    <>
      <div className="px-2">
        <Card className="border-none shadow-none bg-gradient-to-br from-orange-700/20 to-orange-900/10 relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] pointer-events-none" />
          
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-orange-500" />
              <CardTitle className="text-sm text-orange-500">Upload & Analyze</CardTitle>
            </div>
            <CardDescription className="text-xs text-gray-400">
              Upload Flare Footage for AI-Powered Visual Inspection
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="w-full h-8 text-xs bg-orange-950/30 border-orange-800/30 hover:bg-orange-900/30 text-orange-200"
              onClick={handleUploadClick}
            >
              <Upload className="mr-2 h-3 w-3" />
              {uploadedFile ? 
                uploadedFile.name.slice(0, 20) + (uploadedFile.name.length > 20 ? '...' : '') 
                : 'Upload'}
            </Button>
            <Button 
              className="w-full h-8 text-xs bg-orange-600 hover:bg-orange-500 text-white border-none" 
              onClick={handleAnalyzeClick}
              disabled={!uploadedFile}
            >
              Analyze Flare
            </Button>
          </CardContent>
        </Card>
      </div>

      <AnalysisDialog 
        open={showAnalysis} 
        onOpenChange={handleDialogClose}
      />
    </>
  )
}
