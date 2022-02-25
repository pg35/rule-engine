import { useState } from "react";
import KeySelect from "./KeySelect";
import { globals } from "../utility";

export default function Rule(props) {
  const [r, setR] = useState([1, 1, "hello world"]);
  const handleKeyChange = (key) => {
    console.log(key);
    setR(r.map((v, i) => (0 === i ? key : r[i])));
  };
  const condition = globals.appData.condition_info[r[0]];
  const operators = globals.appData.operator_info;
  const operatorOptions = condition.op_ids.map((id) => (
    <option value={id} key={id}>
      {operators[id].name}
    </option>
  ));

  return (
    <div>
      <KeySelect value={r[0]} onChange={handleKeyChange} />
      <select value={r[1]} onChange={(e) => {}}>
        {operatorOptions}
      </select>
    </div>
  );
}
