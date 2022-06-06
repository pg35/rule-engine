import { Draggable as DndDraggable } from "react-beautiful-dnd";
import styled from "styled-components";

export default function Draggable(props) {
  const { id, index, children } = props;
  return (
    <DndDraggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          {children({
            dragHandleProps: provided.dragHandleProps,
            isDragging: snapshot.isDragging
          })}
        </div>
      )}
    </DndDraggable>
  );
}
