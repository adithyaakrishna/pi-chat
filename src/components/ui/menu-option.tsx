import { LucideIcon } from "lucide-react";
import React from "react";

export interface MenuOptionProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

const MenuOption = React.memo(({
  icon: Icon,
  label,
  onClick,
  className = "",
}: MenuOptionProps) => {
  return (
    <div 
      className={`flex items-center justify-between py-3 hover:bg-green-50 px-2 rounded-md cursor-pointer transition-colors ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-green-900" />
        <span className="text-lg text-green-900">{label}</span>
      </div>
      <div className="text-gray-400">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5"
        >
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
});

MenuOption.displayName = "MenuOption";

export default MenuOption;