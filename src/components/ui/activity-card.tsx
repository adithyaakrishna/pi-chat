import { motion } from "framer-motion";

interface ActivityCardProps {
  title: string;
  emoji?: string;
  backgroundColor?: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  index: number;
}

const ActivityCard = ({ title, emoji, backgroundColor, position, index }: ActivityCardProps) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        ...position,
        backgroundColor,
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-2">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <span className="font-medium">{title}</span>
      </div>
    </motion.div>
  );
};

export default ActivityCard;