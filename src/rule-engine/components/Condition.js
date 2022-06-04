import MultiSelect from "./ui/MultiSelect";
import {
  getKeyOptions,
  getOperatorIds,
  getOperatorOptions,
  getKeyDefaultValue,
  getMultiSelectProps
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

  const handleMultiSelectChange = (selectedOptions) => {
    const e = {
      target: {
        name: "value",
        value: selectedOptions
      }
    };
    handleChange(e);
  };

  let inputField = null;
  const nKeyId = Number(keyId);

  if ([1, 3].includes(nKeyId)) {
    inputField = (
      <MultiSelect
        name="value"
        value={value}
        onChange={handleMultiSelectChange}
        {...getMultiSelectProps(nKeyId)}
      />
    );
  } else
    inputField = (
      <input type="text" name="value" value={value} onChange={handleChange} />
    );

  return (
    <div className="condition">
      {/*<div className="icon sort-handle">
        <i className="dashicons dashicons-menu"></i>
      </div>
      */}
      <div className="condition__key">
        <select name="keyId" value={keyId} onChange={handleChange}>
          {getKeyOptions(config, ruleListId, condListIndex)}
        </select>
      </div>
      <div className="condition__op">
        <select name="opId" value={opId} onChange={handleChange}>
          {getOperatorOptions(keyId)}
        </select>
      </div>
      <div className="condition__val">{inputField}</div>
      <div className="condition__remove">
        <button
          title="Delete"
          className="icon btn-remove"
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
          <i className="dashicons dashicons-no-alt"></i>
        </button>
      </div>
    </div>
  );
}
