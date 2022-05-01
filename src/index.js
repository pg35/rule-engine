import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
//import "./wp.css";

const rulesConfig = {
  inquiry: {
    label: "Inquiry",
    criteria: [
      {
        labels: {
          field: "Products",
          empty: "Applies to all products.",
          addNew: "Add Product"
        },
        descritpion: "",
        keyIds: [1, 2, 3]
      },
      {
        labels: {
          field: "Conditions",
          empty: "Applies in all cases.",
          addNew: "Add Condition"
        },
        descritpion: "",
        keyIds: [2]
      }
    ]
  },
  cart: {
    label: "Cart",
    criteria: [
      {
        labels: {
          field: "Products",
          empty: "Applies to all products",
          addNew: "Add Products"
        },
        descritpion: "",
        keyIds: [1, 2, 3]
      },
      {
        labels: {
          field: "Conditions",
          empty: "Applies in all cases.",
          addNew: "Add Condition"
        },
        descritpion: "",
        keyIds: [2]
      }
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
