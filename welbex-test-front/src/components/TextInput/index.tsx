import React from "react";
import "./styles.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  onBlur?: () => void;
}

// custom text input component
const TextInput = ({ onChange, value, placeholder, error, onBlur }: Props) => {
  return (
    <div className="input_container">
      <input
        onChange={({ target }) => onChange(target.value)}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      <div className="input_error">{error}</div>
    </div>
  );
};

export default TextInput;
