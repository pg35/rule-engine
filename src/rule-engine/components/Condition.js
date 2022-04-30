import ProductSelect from "./ProductSelect";
import {
  getKeyOptions,
  getOperatorIds,
  getOperatorOptions,
  getKeyDefaultValue
} from "../util";
//import "../styles.css";

export default function Condition(props) {
  const { ruleListId, ruleId, condListIndex, condition, config } = props;
  const { id, keyId, opId, value } = condition;

  const handleChange = (e) => {
    const changes = {};
    if ("keyId" === e.target.name) {
      changes.keyId = e.target.value;
      changes.opId = getOperatorIds(e.target.value)[0];
      changes.value = getKeyDefaultValue(changes.keyId);
    } else if ("opId" === e.target.name) {
      changes.opId = e.target.value;
    } else if ("value" === e.target.name) {
      changes.value = e.target.value;
    }

    props.dispatch({
      type: "UPDATE_CONDITION",
      ruleListId,
      ruleId,
      condListIndex,
      condition: {
        id,
        ...changes
      }
    });
  };

  const handleProductChange = (selectedOptions) => {
    const e = {
      target: {
        name: "value",
        value: selectedOptions
      }
    };
    handleChange(e);
  };

  let inputField = null;
  if (1 === Number(keyId)) {
    inputField = (
      <ProductSelect
        name="value"
        value={value}
        onChange={handleProductChange}
      />
    );
  } else
    inputField = <input name="value" value={value} onChange={handleChange} />;

  return (
    <div className="condition row">
      <div className="col-md-3 ">
        <select name="keyId" value={keyId} onChange={handleChange}>
          {getKeyOptions(config, ruleListId, condListIndex)}
        </select>
      </div>
      <div className="col-md-2">
        <select name="opId" value={opId} onChange={handleChange}>
          {getOperatorOptions(keyId)}
        </select>
      </div>
      <div className="col-md-6">{inputField}</div>
      <div className="col-md-1">
        <button
          onClick={(e) =>
            props.dispatch({
              type: "REMOVE_CONDITION",
              ruleListId,
              ruleId,
              condListIndex,
              conditionId: id
            })
          }
        >
          {" "}
          X{" "}
        </button>
      </div>
    </div>
  );
}
