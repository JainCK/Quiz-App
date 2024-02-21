import React from "react";

interface QuestionProps {
  question: string;
  options: string[];
  onSelectOptions: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  onSelectOptions,
}) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onSelectOptions(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
