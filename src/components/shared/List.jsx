import { ListItem } from "./ListItem";
import { useCallback, useEffect, useState, useRef, memo } from "react";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import "./List.scss";

const ListComponent = ({
  id,
  heading,
  list_array,
  onListUpdate,
  onCheckboxChange,
}) => {
  const prevListRef = useRef([]);
  const prevHeaderRef = useRef("");
  const [glowHeader, setGlowHeader] = useState(false);
  const [glowList, setGlowList] = useState({});
  const [glowListContainer, setGlowListContainer] = useState(false);
  const [isUserInteraction, setIsUserInteraction] = useState(false);

  const sensors = [useSensor(PointerSensor)];

  // Handle user drag end
  const handleDragEnd = useCallback(
    (event) => {
      setIsUserInteraction(true);
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = parseInt(active.id, 10);
        const newIndex = over ? parseInt(over.id, 10) : list_array.length - 1;
        const updatedList = arrayMove(list_array, oldIndex, newIndex);
        onListUpdate(id, updatedList);
      }
      setTimeout(() => setIsUserInteraction(false), 0);
    },
    [id, onListUpdate, list_array]
  );

  // Handle user checkbox click
  const handleCheckboxClick = useCallback(
    (index) => {
      setIsUserInteraction(true);
      onCheckboxChange(id, index);
      setTimeout(() => setIsUserInteraction(false), 0);
    },
    [id, onCheckboxChange]
  );

  // Glow on header update (only if not user interaction)
  useEffect(() => {
    if (prevHeaderRef.current !== heading && !isUserInteraction) {
      setGlowHeader(true);
      setTimeout(() => setGlowHeader(false), 1500);
    }
    prevHeaderRef.current = heading;
  }, [heading, isUserInteraction]);

  // Check if all items in the list have changed
  const allItemsChanged = (prevArray, currentArray) => {
    if (prevArray.length !== currentArray.length) {
      return true;
    }
    for (let i = 0; i < prevArray.length; i++) {
      if (prevArray[i] === currentArray[i]) {
        return false;
      }
    }
    return true;
  };

  // Glow on list update (only if not user interaction)
  useEffect(() => {
    if (!isUserInteraction) {
      if (allItemsChanged(prevListRef.current, list_array)) {
        setGlowListContainer(true);
        setTimeout(() => setGlowListContainer(false), 1500);
      } else {
        const updatedIndices = {};
        list_array.forEach((item, index) => {
          if (prevListRef.current[index] !== item) {
            updatedIndices[index] = true;
            setTimeout(() => {
              setGlowList((prev) => ({ ...prev, [index]: false }));
            }, 1500);
          }
        });
        if (Object.keys(updatedIndices).length) {
          setGlowList(updatedIndices);
        }
      }
    }
    prevListRef.current = list_array;
  }, [list_array, isUserInteraction]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToFirstScrollableAncestor]}
    >
      <div className="container" id={id}>
        <div className={`heading-container ${glowHeader ? "glow" : ""}`}>
          <h1>{heading}</h1>
        </div>
        <div className={`list-container ${glowListContainer ? "glow" : ""}`}>
          <SortableContext
            items={list_array.map((_, i) => i.toString())}
            strategy={verticalListSortingStrategy}
          >
            {list_array.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                index={index}
                id={index.toString()}
                onCheckboxChange={handleCheckboxClick}
                isGlowing={glowList[index] || false}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export const List = memo(ListComponent);
