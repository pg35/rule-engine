import { getOperatorOptions } from "../config";

export default function Condition(props) {
  const { screenId, ruleId, condition, keyOptions, onChange } = props;
  const { id, keyId, opId, value } = condition;
  const handleChange = (e) => {
    onChange({
      screenId,
      ruleId,
      condition: {
        id,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div>
      <select name="keyId" value={keyId} onChange={handleChange}>
        {keyOptions}
      </select>
      <select name="opId" value={opId} onChange={handleChange}>
        {getOperatorOptions(id)}
      </select>
      <input name="value" value={value} onChange={handleChange} />
    </div>
  );
}
