import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const SidebarButton = React.memo(({
  icon: Icon,
  label,
  isActive,
  onClick,
  className,
}: SidebarButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2 rounded-md transition-all duration-300 hover:bg-[#ede1d1]/60 flex flex-col items-center",
        isActive ? "bg-[#ede1d1]" : "",
        className
      )}
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-green-900" />
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
});

SidebarButton.displayName = "SidebarButton";

export default SidebarButton;