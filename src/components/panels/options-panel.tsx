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
    <div className="space-y-4 md:space-y-6 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 md:py-6 h-full">
      <div onClick={() => handleOptionClick("Show me my conversation history")} 
           className="bg-[#F2EDE5] rounded-[20px] md:rounded-[24px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_2px_rgba(0,0,0,0.08)] transition-shadow duration-300">
        <FeatureCard
          emoji="💬"
          title="Download your Pi conversation history"
          actionText="Manage history"
          onAction={() => {}}
          delay={0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div onClick={() => handleOptionClick("I'd like to practice for a job interview. Could you be the interviewer and ask me common interview questions? Please provide constructive feedback on my responses and help me improve my interview skills.")}
             className="bg-[#F2EDE5] rounded-[20px] md:rounded-[24px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_2px_rgba(0,0,0,0.08)] transition-shadow duration-300">
          <ImageCard
            imageUrl={JOB_INTERVIEW_IMAGE}
            title="Practice Job Interview"
            delay={0.1}
            alt="Person in professional attire preparing for job interview"
            onClick={() => handleOptionClick("I'd like to practice for a job interview. Could you be the interviewer and ask me common interview questions? Please provide constructive feedback on my responses and help me improve my interview skills.")}
          />
        </div>

        <div onClick={() => handleOptionClick("Let's engage in some brain teasers! Could you present me with a mix of logical, mathematical and word riddles? I'd like to solve them and get hints if I'm stuck.")}
             className="bg-[#F2EDE5] rounded-[20px] md:rounded-[24px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_2px_rgba(0,0,0,0.08)] transition-shadow duration-300">
          <ImageCard
            imageUrl={RIDDLES_IMAGE}
            title="Solve Riddles"
            delay={0.2}
            alt="Abstract puzzle pieces representing riddles and brain teasers"
            onClick={() => handleOptionClick("Let's engage in some brain teasers! Could you present me with a mix of logical, mathematical and word riddles? I'd like to solve them and get hints if I'm stuck.")}
          />
        </div>
      </div>

      <div onClick={() => handleOptionClick("Could you explain the fascinating concept of the multiverse in simple terms? I'd like to understand the different theories, how they might work, and what evidence scientists have found that supports these ideas.")}
           className="bg-[#F2EDE5] rounded-[20px] md:rounded-[24px] shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_2px_rgba(0,0,0,0.08)] transition-shadow duration-300">
        <HorizontalCard
          title="Explore the Multiverse"
          imageUrl={GALAXY_IMAGE}
          delay={0.3}
          alt="Spiral galaxy in deep space representing the multiverse concept"
          onClick={() => handleOptionClick("Could you explain the fascinating concept of the multiverse in simple terms? I'd like to understand the different theories, how they might work, and what evidence scientists have found that supports these ideas.")}
        />
      </div>
    </div>
  );
});

OptionsPanel.displayName = "OptionsPanel";

export default OptionsPanel;
