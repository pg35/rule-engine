import { DragDropContext as DnDDragDropContext } from "react-beautiful-dnd";

export default function DragDropContext(props) {
  const { onDragStart = () => {}, onDragEnd = () => {}, children } = props;

  const handleDragStart = (result) => {
    onDragStart(result.draggableId);
  };

  const handleDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    if (!destination) return onDragEnd();
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return onDragEnd();
    }
    onDragEnd(source.index, destination.index);
  };

  return (
    <DnDDragDropContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onBeforeCapture={props.onBeforeCapture}
    >
      {children}
    </DnDDragDropContext>
  );
}
