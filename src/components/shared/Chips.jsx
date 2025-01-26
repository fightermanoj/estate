import React, { useState } from "react";
import "./Chips.scss";

const Chip = ({ label, message, onChipClick, onChipRemove }) => {
  const handleClick = () => {
    onChipClick(message);
    onChipRemove(label);
  };

  return (
    <button className="chip" onClick={handleClick}>
      {label}
    </button>
  );
};

export const Chips = ({ title, chips, onChipClick }) => {
  const [visibleChips, setVisibleChips] = useState(chips);

  const handleChipRemove = (label) => {
    setVisibleChips((prevChips) =>
      prevChips.filter((chip) => chip.label !== label)
    );
  };

  return (
    <div className="chips-container">
      {visibleChips.length > 0 && <p>{title}</p>}
      {visibleChips.map((chip) => (
        <Chip
          key={chip.label}
          label={chip.label}
          message={chip.message}
          onChipClick={onChipClick}
          onChipRemove={handleChipRemove}
        />
      ))}
    </div>
  );
};
