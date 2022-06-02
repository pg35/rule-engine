import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
//import "./wp.css";
import { rulesConfig } from "./config";
/*
import Droppable from "./rule-engine/components/ui/Droppable";
import Draggable from "./rule-engine/components/ui/Draggable";
import Collapsible from "./rule-engine/components/ui/Collapsible";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
*/
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App rulesConfig={rulesConfig} />
  </StrictMode>,
  rootElement
);
/*
const Container = styled.div`
  border: 1px solid #aaa;
  border-radius: 2px;
  margin: 8px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  padding: 10px;
  border: 1px solid blue;
`;
ReactDOM.render(
  <Container>
    <DragDropContext>
      <Droppable id={"imr"} type={"aaa"}>
        {[1, 2, 3].map((a, index) => (
          <Draggable id={a.toString()} index={index} key={a}>
            {(p) => <Item {...p.dragHandleProps}>{a}</Item>}
          </Draggable>
        ))}
      </Droppable>
    </DragDropContext>
  </Container>,
  rootElement
);
*/
