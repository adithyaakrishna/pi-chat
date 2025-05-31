import React, { useCallback } from "react";
import { Sparkle, UserRound } from "lucide-react";
import SidebarButton from "@/components/ui/sidebar-button";

interface SidebarProps {
  activeIcon: string;
  setActiveIcon: (iconName: string) => void;
}

const Sidebar = React.memo(({ activeIcon, setActiveIcon }: SidebarProps) => {
  const handleDiscoverClick = useCallback(() => {
    setActiveIcon("discover");
  }, [setActiveIcon]);
  
  const handleProfileClick = useCallback(() => {
    setActiveIcon("profile");
  }, [setActiveIcon]);
  
  return (
    <div className="h-full flex flex-col items-center py-6 bg-[#F2EDE5] text-gray-600">
      <div className="flex flex-col items-center space-y-8">
        <SidebarButton
          icon={Sparkle}
          label="Discover"
          isActive={activeIcon === "discover"}
          onClick={handleDiscoverClick}
        />
        
        <SidebarButton
          icon={UserRound}
          label="Profile"
          isActive={activeIcon === "profile"}
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;