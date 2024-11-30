import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  LogOut,
  Settings,
  Sliders,
  HelpCircle,
  User,
  Wallet,
  Smartphone,
  Pill,
  Calendar as CalendarIcon,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useTheme } from "../theme-provider";
import phIcon from "../../assets/ph-icon2.svg";

export const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [notifications, setNotifications] = React.useState(3);
  
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
  const userRole = localStorage.getItem("userRole") || "guest";
  const displayName = userRole === "guest" ? "Guest User" : userEmail.split("@")[0];
  const avatarInitials = displayName.split(" ").map(n => n[0]).join("").toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#BF0F73] border-b border-[#F7F7F7]/10 px-4 flex items-center justify-between z-50">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="hover:opacity-90"
        >
          <img 
            src={phIcon} 
            alt="Protocol Health" 
            className="h-8 w-8"
          />
        </Link>
      </div>

      {/* Right side - Navigation Links, Notifications, and User Account */}
      <div className="flex items-center space-x-6">
        <Link
          to="/longevity-index"
          className={`
            flex items-center gap-2 px-4 h-8 rounded-md border border-white/90 
            font-medium text-sm transition-all duration-300 transform hover:scale-105
            ${isActive('/longevity-index') 
              ? 'text-white bg-white/20' 
              : 'text-white hover:text-white hover:bg-white/10'
            }
          `}
        >
          <Activity className="h-4 w-4" />
          Longevity Index
        </Link>
        <Link
          to="/calendar"
          className={`relative text-sm font-medium transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2 ${
            isActive('/calendar') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          <CalendarIcon className="h-4 w-4" />
          Calendar
        </Link>
        <Link
          to="/health-wallet"
          className={`relative text-sm font-medium transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2 ${
            isActive('/health-wallet') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Wallet className="h-4 w-4" />
          Health Wallet
        </Link>
        <Link
          to="/devices"
          className={`relative text-sm font-medium transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2 ${
            isActive('/devices') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          Devices
        </Link>
        <Link
          to="/rx-cabinet"
          className={`relative text-sm font-medium transition-all duration-300 transform hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full flex items-center gap-2 ${
            isActive('/rx-cabinet') ? 'text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Pill className="h-4 w-4" />
          Rx Cabinet
        </Link>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative hover:bg-white/10">
              <Bell size={20} className="text-white" />
              {notifications > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#E65C00] text-white font-medium"
                  variant="destructive"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1A1D23] border-[#F7F7F7]/10">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#F7F7F7]/10">
              <span className="font-semibold text-white">Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotifications(0)}
                className="hover:bg-white/10 text-white"
              >
                Mark all as read
              </Button>
            </div>
            {/* Example notifications */}
            <div className="py-2 px-4 text-sm">
              <div className="mb-2">
                <p className="font-medium text-white">Daily Goal Achieved!</p>
                <p className="text-white/70">You've reached your step goal for today.</p>
              </div>
              <div className="mb-2">
                <p className="font-medium text-white">New Health Tip Available</p>
                <p className="text-white/70">Check out today's wellness advice.</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <div className="AvatarRoot h-8 w-8 rounded-full overflow-hidden">
                <img 
                  src="https://unsplash.com/photos/N8lRH2uxih4/download?force=true"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1A1D23] border-[#F7F7F7]/10">
            <div className="px-4 py-3 border-b border-[#F7F7F7]/10">
              <div className="flex items-center space-x-3">
                <div className="AvatarRoot h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src="https://unsplash.com/photos/N8lRH2uxih4/download?force=true"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{displayName}</p>
                  <p className="text-xs text-white/70">{userEmail}</p>
                </div>
              </div>
            </div>
            <Link to="/profile">
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings">
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/preferences">
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <Sliders className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/help">
              <DropdownMenuItem className="text-white hover:bg-white/10">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-[#F7F7F7]/10" />
            <DropdownMenuItem 
              className="text-[#FFC67D] hover:bg-white/10 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
