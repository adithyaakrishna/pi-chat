import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface ImageCardProps {
  imageUrl: string;
  title: string;
  className?: string;
  height?: string;
  delay?: number;
  onClick?: () => void;
  alt?: string;
}

const ImageCard = React.memo(({
  imageUrl,
  title,
  className,
  height = "h-36",
  delay = 0,
  onClick,
  alt = "Card image",
}: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "bg-cover bg-center rounded-xl overflow-hidden relative cursor-pointer",
        height,
        className
      )}
      onClick={onClick}
    >
      <img 
        src={imageUrl}
        alt={alt}
        width="400"
        height="300"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg font-medium leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
});

ImageCard.displayName = "ImageCard";

export default ImageCard;