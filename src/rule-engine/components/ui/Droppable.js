import { Droppable as DndDroppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ItemList = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "#B9D9EB" : "white")};
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px; /*seems redundant*/
`;

export default function Droppable(props) {
  const { id, type, children } = props;
  return (
    <DndDroppable droppableId={id} type={type}>
      {(provided, snapshot) => (
        <ItemList
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </ItemList>
      )}
    </DndDroppable>
  );
}
