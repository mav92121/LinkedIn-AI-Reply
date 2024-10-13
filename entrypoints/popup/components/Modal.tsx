import React, { useEffect } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, onInsert }) => {
  const [inputValue, setInputValue] = React.useState("");

  if (!isVisible) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("modal-background")) {
      onClose();
    }
  };

  const handleGenerate = () => {
    const response =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    onInsert(response);
    onClose();
  };

  return (
    <div className="modal-background" onClick={handleOutsideClick}>
      <div className="modal">
        <h2>Enter your command</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your command here"
        />
        <button onClick={handleGenerate}>Generate</button>
        <button disabled>Regenerate</button>
      </div>
    </div>
  );
};

export default Modal;
