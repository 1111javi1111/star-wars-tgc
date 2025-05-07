import React from "react";
import { useDrag } from "react-dnd";

const CardDraggable = ({ card, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className="card playable zoom"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {card.name} ({card.cost})
    </div>
  );
};

export default CardDraggable;