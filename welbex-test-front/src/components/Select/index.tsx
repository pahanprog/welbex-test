import React, { useEffect, useState } from "react";
import "./styles.css";

interface Props {
  placeholder: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

// custom select component
const Select = ({
  placeholder,
  options,
  selectedOption,
  setSelectedOption,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  return (
    <div>
      <div
        className="select"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        {selectedOption ? (
          selectedOption
        ) : (
          <div className="select_placeholder">{placeholder}</div>
        )}
      </div>
      <div className={`options ${isOpen ? "open" : "closed"}`}>
        {options.map((option) => {
          if (option !== selectedOption) {
            return (
              <div
                key={option}
                className="option"
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </div>
            );
          } else {
            return null;
          }
        })}
        <div className="option" onClick={() => setSelectedOption("")}>
          Clear
        </div>
      </div>
    </div>
  );
};

export default Select;
