import ProductSelect from "./ProductSelect";
import {
  getkeyOptions,
  getOperatorIds,
  getOperatorOptions,
  getDefaultValue
} from "../config";

export default function Condition(props) {
  const { screenId, ruleId, listIndex, condition, onChange } = props;
  const { id, keyId, opId, value } = condition;

  const handleChange = (e) => {
    const changes = {};
    if ("keyId" === e.target.name) {
      changes.keyId = e.target.value;
      changes.opId = getOperatorIds(e.target.value)[0];
      changes.value = getDefaultValue(changes.keyId);
    } else if ("opId" === e.target.name) {
      changes.opId = e.target.value;
    } else if ("value" === e.target.name) {
      changes.value = e.target.value;
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
