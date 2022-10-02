import React from "react";
import "./styles.css";

interface Props {
  title: string;
  onClick: () => void;
}

// custom button component
const Button = ({ onClick, title }: Props) => {
  return (
    <div className="button" onClick={() => onClick()}>
      {title}
    </div>
  );
};

export default Button;
