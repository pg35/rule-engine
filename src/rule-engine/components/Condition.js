import MultiSelect from "./ui/MultiSelect";
import {
  getKeyOptions,
  getOperatorIds,
  getOperatorOptions,
  getKeyDefaultValue,
  getMultiSelectProps,
  getKeyInputControl
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

  switch (getKeyInputControl(nKeyId)) {
    case "multiselect":
      inputField = (
        <MultiSelect
          name="value"
          value={value}
          onChange={handleMultiSelectChange}
          {...getMultiSelectProps(nKeyId)}
          keyId={nKeyId}
        />
      );
      break;
    case "text":
      inputField = (
        <input type="text" name="value" value={value} onChange={handleChange} />
      );
      break;
    case false:
      break;
    default:
      throw new Error(
        "unknow input control" +
          getKeyInputControl(nKeyId) +
          " for keyid " +
          nKeyId
      );
  }

  return (
    <div className={`condition ${inputField ? "" : "condition--noinput"}`}>
      {/*
        <div className="icon sort-handle">
          <i className="dashicons dashicons-menu"></i>
        </div>
      */}
      <div className="condition__key">
        <select name="keyId" value={keyId} onChange={handleChange}>
          {getKeyOptions(config, ruleListId, condListIndex, keyId)}
        </select>
      </div>
      <div className="condition__op">
        <select name="opId" value={opId} onChange={handleChange}>
          {getOperatorOptions(keyId)}
        </select>
      </div>
      {inputField && <div className="condition__val">{inputField}</div>}
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
