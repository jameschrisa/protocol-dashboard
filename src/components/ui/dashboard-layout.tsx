import * as React from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Toaster } from "sonner"
import { Menu, PanelRightOpen } from "lucide-react"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"
import { NotificationButton } from "./notifications"
import { navigation, footerNavigation } from "../../config/navigation"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { useAnalysisState } from "../../hooks/use-analysis-state"
import { logger } from "../../lib/logger"
import { SidebarCard } from "./sidebar-card"
import * as Tooltip from '@radix-ui/react-tooltip'
import logo from "../../assets/logo.svg"

const activeNavClasses = "relative bg-orange-700/20 text-orange-500 before:absolute before:inset-0 before:rounded-lg before:border before:border-white/20 before:shadow-[0_0_15px_rgba(255,255,255,0.1)] before:pointer-events-none"

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { hasRunAnalysis } = useAnalysisState()
  
  // Reset navigation settings to ensure all items are visible
  React.useEffect(() => {
    localStorage.removeItem("dashboard-nav-settings")
  }, [])

  const [navSettings] = useLocalStorage<Record<string, boolean>>(
    "dashboard-nav-settings",
    [...navigation, ...footerNavigation].reduce((acc, nav) => ({ ...acc, [nav.id]: true }), {})
  )

  // Filter navigation items based on settings
  const visibleNavigation = navigation.filter(nav => navSettings[nav.id])
  const visibleFooterNavigation = footerNavigation.filter(nav => navSettings[nav.id])

  // Log navigation changes
  React.useEffect(() => {
    const logNavigation = async () => {
      try {
        const currentPage = location.pathname === '/' ? 'Overview' : 
          location.pathname.slice(1).split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')

        await logger.logActivity('Page Navigation', {
          from: document.referrer,
          to: location.pathname,
          page: currentPage
        })
      } catch (error) {
        console.error('Failed to log navigation:', error)
      }
    }

    logNavigation()
  }, [location])

  // Log sidebar collapse state changes
  const handleCollapse = async () => {
    try {
      const newState = !isCollapsed
      setIsCollapsed(newState)
      await logger.logActivity('Sidebar Toggle', {
        state: newState ? 'collapsed' : 'expanded'
      })
    } catch (error) {
      console.error('Failed to log sidebar state:', error)
    }
  }

  const handleUpload = (file: File) => {
    console.log('File uploaded:', file)
    // Handle file upload logic here
  }

  const handleAnalyze = () => {
    navigate('/analyzing')
  }

  const renderNavigationLink = (item: typeof navigation[0]) => {
    const isActive = location.pathname === item.href
    const isRiskCoverage = item.href === '/risk-coverage-analysis'
    const isDisabled = isRiskCoverage && !hasRunAnalysis

    const linkContent = (
      <>
        <item.icon className="h-4 w-4" />
        {!isCollapsed && <span>{item.name}</span>}
      </>
    )

    const linkClasses = cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
      isActive ? activeNavClasses : "transparent hover:bg-accent",
      isCollapsed ? "justify-center" : "",
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    )

    if (isDisabled) {
      return (
        <Tooltip.Provider key={item.id}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className={linkClasses}>{linkContent}</div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95"
                sideOffset={5}
              >
                Run Analysis to access Risk Coverage
                <Tooltip.Arrow className="fill-primary" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )
    }

    return (
      <Link
        key={item.id}
        to={item.href}
        className={linkClasses}
      >
        {linkContent}
      </Link>
    )
  }

  const renderNavigationWithCard = () => {
    const complianceIndex = visibleNavigation.findIndex(item => item.id === 'compliance')
    if (complianceIndex === -1) return visibleNavigation.map(item => renderNavigationLink(item))

    return (
      <>
        {visibleNavigation.slice(0, complianceIndex + 1).map(item => renderNavigationLink(item))}
        {!isCollapsed && (
          <div className="px-2 py-2">
            <SidebarCard onUpload={handleUpload} onAnalyze={handleAnalyze} />
          </div>
        )}
        {visibleNavigation.slice(complianceIndex + 1).map(item => renderNavigationLink(item))}
      </>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <MobileSidebar 
            navigation={visibleNavigation}
            footerNavigation={visibleFooterNavigation}
            hasRunAnalysis={hasRunAnalysis}
            onUpload={handleUpload}
            onAnalyze={handleAnalyze}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <nav
        className={cn(
          "hidden lg:flex fixed inset-y-0",
          isCollapsed ? "lg:w-[72px]" : "lg:w-[240px]"
        )}
      >
        <div className="flex flex-col h-screen w-full bg-background border-r">
          <div className="flex h-[52px] items-center justify-between px-4 border-b">
            <Link to="/" className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "gap-2")}>
              <img src={logo} alt="Logo" className="h-6 w-6" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-6 w-6", isCollapsed ? "absolute -right-3 top-5 bg-background border rounded-full" : "ml-auto")}
              onClick={handleCollapse}
            >
              <PanelRightOpen
                className={cn("h-4 w-4 transition-all", {
                  "rotate-180": !isCollapsed,
                })}
              />
            </Button>
          </div>
          
          {/* Main navigation with card after Compliance */}
          <ScrollArea className="flex-grow">
            <div className="flex flex-col gap-2 p-2">
              {renderNavigationWithCard()}
            </div>
          </ScrollArea>

          {/* Footer navigation - sticky at bottom */}
          <div className="flex-shrink-0 border-t p-2">
            {visibleFooterNavigation.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                  location.pathname === item.href ? activeNavClasses : "transparent hover:bg-accent",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className={cn("flex-1", isCollapsed ? "lg:pl-[72px]" : "lg:pl-[240px]")}>
        {/* Top bar */}
        <div className="border-b">
          <div className="container mx-auto flex h-[52px] items-center justify-end gap-4 px-4">
            <NotificationButton />
          </div>
        </div>
        <div className="container mx-auto h-full py-6">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </div>
  )
}

interface SidebarProps {
  navigation: typeof navigation
  footerNavigation: typeof footerNavigation
  hasRunAnalysis: boolean
  onUpload: (file: File) => void
  onAnalyze: () => void
}

function MobileSidebar({ navigation, footerNavigation, hasRunAnalysis, onUpload, onAnalyze }: SidebarProps) {
  const location = useLocation()
  
  const renderNavigationLink = (item: typeof navigation[0]) => {
    const isActive = location.pathname === item.href
    const isRiskCoverage = item.href === '/risk-coverage-analysis'
    const isDisabled = isRiskCoverage && !hasRunAnalysis

    const linkContent = (
      <>
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </>
    )

    const linkClasses = cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
      isActive ? activeNavClasses : "transparent hover:bg-accent",
      isDisabled ? "opacity-50 cursor-not-allowed" : ""
    )

    if (isDisabled) {
      return (
        <Tooltip.Provider key={item.id}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className={linkClasses}>{linkContent}</div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95"
                sideOffset={5}
              >
                Run Analysis to access Risk Coverage
                <Tooltip.Arrow className="fill-primary" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )
    }

    return (
      <Link
        key={item.id}
        to={item.href}
        className={linkClasses}
      >
        {linkContent}
      </Link>
    )
  }

  const renderNavigationWithCard = () => {
    const complianceIndex = navigation.findIndex(item => item.id === 'compliance')
    if (complianceIndex === -1) return navigation.map(item => renderNavigationLink(item))

    return (
      <>
        {navigation.slice(0, complianceIndex + 1).map(item => renderNavigationLink(item))}
        <div className="px-2 py-2">
          <SidebarCard onUpload={onUpload} onAnalyze={onAnalyze} />
        </div>
        {navigation.slice(complianceIndex + 1).map(item => renderNavigationLink(item))}
      </>
    )
  }
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-[52px] items-center px-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-6 w-6" />
        </Link>
      </div>
      
      {/* Main navigation with card after Compliance */}
      <ScrollArea className="flex-grow">
        <div className="flex flex-col gap-2 p-2">
          {renderNavigationWithCard()}
        </div>
      </ScrollArea>

      {/* Footer navigation */}
      <div className="flex-shrink-0 border-t p-2">
        {footerNavigation.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
              location.pathname === item.href ? activeNavClasses : "transparent hover:bg-accent"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
