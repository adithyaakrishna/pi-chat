import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface FeatureCardProps {
  emoji?: string;
  title: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  backgroundColor?: string;
  delay?: number;
}

const FeatureCard = React.memo(({
  emoji,
  title,
  actionText,
  onAction,
  className,
  backgroundColor = "#f2ede5",
  delay = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "p-4 sm:p-5 md:p-6 rounded-xl",
        className
      )}
      style={{ backgroundColor }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {emoji && (
          <div className="flex-shrink-0">
            <div className="bg-purple-100 h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">{emoji}</span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-serif text-green-900 mb-1 line-clamp-2">
            {title}
          </h2>
          {actionText && (
            <button 
              className="text-sm sm:text-base text-green-600 font-medium hover:text-green-800 transition-colors" 
              onClick={onAction}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
