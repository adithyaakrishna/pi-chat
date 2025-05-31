import React from "react";

interface MenuSeparatorProps {
  className?: string;
}

const MenuSeparator = React.memo(({ className = "" }: MenuSeparatorProps) => {
  return (
    <div className={`border-t border-gray-300 my-6 ${className}`}></div>
  );
});

MenuSeparator.displayName = "MenuSeparator";

export default MenuSeparator;