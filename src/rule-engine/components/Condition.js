import ProductSelect from "./ProductSelect";
import { getkeyOptions, getOperatorIds, getOperatorOptions } from "../config";

export default function Condition(props) {
  const { screenId, ruleId, listIndex, condition, onChange } = props;
  const { id, keyId, opId, value } = condition;

  const handleChange = (e) => {
    let value = null;

    const changes = {};
    if ("keyId" === e.target.name) {
      changes.opId = getOperatorIds(e.target.value)[0];
    } else if ("value" === e.target.name) {
      value = e.target.value;
      changes.value = value;
    }

    onChange({
      screenId,
      ruleId,
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
        value: selectedOptions.map((obj) => obj.value)
      }
    };
    handleChange(e);
  };

  let inputField = null;
  if (1 === keyId) {
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
    <div>
      <select name="keyId" value={keyId} onChange={handleChange}>
        {getkeyOptions(screenId, listIndex)}
      </select>
      <select name="opId" value={opId} onChange={handleChange}>
        {getOperatorOptions(keyId)}
      </select>
      {inputField}
    </div>
  );
}
