import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface HorizontalCardProps {
  title: string;
  imageUrl: string;
  className?: string;
  backgroundColor?: string;
  delay?: number;
  onClick?: () => void;
  alt?: string;
}

const HorizontalCard = React.memo(({
  title,
  imageUrl,
  className,
  backgroundColor = "#f2ede5",
  delay = 0,
  onClick,
  alt = "Card image",
}: HorizontalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "p-4 sm:p-5 md:p-6 rounded-xl flex items-center gap-4 sm:gap-5 md:gap-6 cursor-pointer group",
        className
      )}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-green-900 line-clamp-2">
          {title}
        </h2>
      </div>
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          width="200"
          height="200"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
});

HorizontalCard.displayName = "HorizontalCard";

export default HorizontalCard;
