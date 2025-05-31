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
        "p-5 rounded-xl flex items-center shadow-sm cursor-pointer",
        className
      )}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="flex-1">
        <h2 className="text-xl font-serif text-green-900 mb-2">
          {title}
        </h2>
      </div>
      <div className="w-24 h-24 rounded-md overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          width="200"
          height="200"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
});

HorizontalCard.displayName = "HorizontalCard";

export default HorizontalCard;