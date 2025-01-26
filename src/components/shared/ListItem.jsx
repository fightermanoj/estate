import React, { memo } from "react";
import Markdown from "react-markdown";
import CheckedIcon from "./svg/CheckedIcon";
import UncheckedIcon from "./svg/UncheckedIcon";
import DragHandle from "./svg/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ListItem.scss";

const ListItemComponent = ({
  item,
  index,
  id,
  onCheckboxChange,
  isGlowing,
}) => {
  // Make sortable item
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, transition: null });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : "none",
    transition: transition || "none",
  };

  // Check if checkbox in markdown
  const isChecklistItem =
    item.startsWith("- [x] ") || item.startsWith("- [ ] ");
  const isChecked = item.startsWith("- [x] ");
  const listItemText = item.replace("- [x] ", "").replace("- [ ] ", "");
  const checkboxId = `checkbox-${id}-${index}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`list-item ${isGlowing ? "glow" : ""}`}
    >
      <Markdown
        components={{
          // All headers to H3
          h1: "h3",
          h2: "h3",
          h4: "h3",
          h5: "h3",
          h6: "h3",
          // Markdown checkbox to SVG icon
          li: ({ node, ...props }) => {
            if (isChecklistItem) {
              return (
                <li {...props} onClick={() => onCheckboxChange(index)}>
                  <label
                    htmlFor={checkboxId}
                    style={{ display: "inline-block" }}
                  >
                    <input
                      id={checkboxId}
                      type="checkbox"
                      defaultChecked={isChecked}
                    />
                    {isChecked ? <CheckedIcon /> : <UncheckedIcon />}{" "}
                    <span>{listItemText}</span>
                  </label>
                </li>
              );
            } else {
              return <li {...props}></li>;
            }
          },
        }}
      >
        {item}
      </Markdown>
      <div className="drag-handle" {...listeners} {...attributes}>
        <DragHandle />
      </div>
    </div>
  );
};

export const ListItem = memo(ListItemComponent);
