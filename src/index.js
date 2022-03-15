import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rulesConfig = {
  inquiry: {
    label: "Inquiry",
    criteria: [
      {
        label: "Select products",
        descritpion: "",
        keyIds: [1, 2, 3]
      },
      { label: "Select conditions", descritpion: "", keyIds: [2] }
    ]
  },
  cart: {
    label: "Cart",
    criteria: [
      {
        label: "Select products",
        descritpion: "",
        keyIds: [1, 2, 3]
      },
      { label: "Select conditions", descritpion: "", keyIds: [2] }
    ]
  }
};
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App rulesConfig={rulesConfig} />
  </StrictMode>,
  rootElement
);
