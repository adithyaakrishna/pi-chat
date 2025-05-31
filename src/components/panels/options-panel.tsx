import React from "react";
import FeatureCard from "../ui/feature-card";
import ImageCard from "../ui/image-card";
import HorizontalCard from "../ui/horizontal-card";

const JOB_INTERVIEW_IMAGE = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=75";
const RIDDLES_IMAGE = "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=75";
const GALAXY_IMAGE = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=75";

interface OptionsPanelProps {
  onOptionSelect: (message: string) => void;
}

const OptionsPanel = React.memo(({ onOptionSelect }: OptionsPanelProps) => {
  const handleOptionClick = (message: string) => {
    onOptionSelect(message);
  };

  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-hidden px-2 sm:px-0">
      <div onClick={() => handleOptionClick("Show me my conversation history")}>
        <FeatureCard
          emoji="💬"
          title="Download your Pi conversation history"
          actionText="Manage history"
          onAction={() => {}}
          delay={0}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div onClick={() => handleOptionClick("Let's practice for a job interview. You'll be the interviewer and I'll be the candidate.")}>
          <ImageCard
            imageUrl={JOB_INTERVIEW_IMAGE}
            title="Roleplay your next job interview with Pi"
            delay={0.1}
            alt="Job Interview"
          />
        </div>

        <div onClick={() => handleOptionClick("Give me some interesting riddles to solve")}>
          <ImageCard
            imageUrl={RIDDLES_IMAGE}
            title="Can you answer these riddles?"
            delay={0.2}
            alt="Riddles"
          />
        </div>
      </div>

      <div onClick={() => handleOptionClick("Explain the concept of the multiverse in simple terms")}>
        <HorizontalCard
          title="Is the multiverse real?"
          imageUrl={GALAXY_IMAGE}
          delay={0.3}
          alt="Galaxy"
        />
      </div>
    </div>
  );
});

OptionsPanel.displayName = "OptionsPanel";

export default OptionsPanel;
