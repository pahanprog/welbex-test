import React from "react";
import Close from "../svgs/Close";
import "./styles.css";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

// modal component
const Modal = ({ handleClose, isOpen, children }: Props) => {
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal_content">
        <div className="modal_close" onClick={handleClose}>
          <Close />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
