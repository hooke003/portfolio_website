import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  const [showFullText, setShowFullText] = useState(false);
  
  const toggleShowText = () => setShowFullText(!showFullText);

  const totalCharacterLimit = 500; // Adjust total character limit for all points combined
  const allPointsCombined = experience.points.join(' • '); // Use a dot or another delimiter for separation
  const isOverLimit = allPointsCombined.length > totalCharacterLimit;
  
  let displayedText;
  if (isOverLimit && !showFullText) {
    displayedText = `${allPointsCombined.substring(0, totalCharacterLimit)}...`;
  } else {
    displayedText = allPointsCombined;
  }
  
  // Split the displayed text back into an array for rendering as list items
  const pointsToDisplay = displayedText.split(' • ');

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {pointsToDisplay.map((point, index) => (
          <li key={`experience-point-${index}`} className='text-white-100 text-[14px] pl-1 tracking-wider'>
            {point}
          </li>
        ))}
      </ul>
      {isOverLimit && (
        <div onClick={toggleShowText} className='text-[#915EFF] font-bold cursor-pointer mt-2'>
          {showFullText ? "Show Less" : "Read More"}
        </div>
      )}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience
        </h2>
      </div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {[...experiences].reverse().map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
