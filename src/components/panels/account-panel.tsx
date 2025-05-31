import { 
  UserRound, 
  History, 
  Mic, 
  Smile, 
  Share, 
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import MenuOption from "../ui/menu-option";
import MenuSeparator from "../ui/menu-separator";
import React from "react";

const AccountPanel = React.memo(() => {
  return (
    <div className="p-3 sm:p-4 md:p-6 h-full bg-[#f7efe3]">
      <h1 className="text-2xl sm:text-3xl font-serif text-green-900 mb-6 sm:mb-8">Adi</h1>
      
      <div className="space-y-4 sm:space-y-6">
        <motion.div 
          className="space-y-3 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MenuOption icon={UserRound} label="Account" />
          <MenuOption icon={History} label="Manage history" />
          <MenuOption icon={Mic} label="Voice settings" />
          <MenuOption icon={Smile} label="Give feedback" />
          <MenuOption icon={Share} label="Share Pi with others" />
        </motion.div>
        
        <MenuSeparator />
        
        <MenuOption icon={MessageCircle} label="Join our Discord community" />
        
        <MenuSeparator />
      </div>
    </div>
  );
});

AccountPanel.displayName = "AccountPanel";

export default AccountPanel;
