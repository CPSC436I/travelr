import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? '#67b0b5' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function DayColumn(props) {
  return (
    <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(
        snapshot.isDragging,
        provided.draggableProps.style
      )}
      >
      {props.item.content}
      </div>
    )}
    </Draggable>
  )
}
