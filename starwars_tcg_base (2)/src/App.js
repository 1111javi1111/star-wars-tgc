import React from "react";
import Game from "./components/Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Game.css";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Game onNavigate={() => {}} />
    </DndProvider>
  );
}