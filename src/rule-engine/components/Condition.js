import { getOperatorIds, getOperatorOptions } from "../config";

export default function Condition(props) {
  const { screenId, ruleId, condition, keyOptions, onChange } = props;
  const { id, keyId, opId, value } = condition;
  const handleChange = (e) => {
    const changes = { [e.target.name]: e.target.value };
    if ("keyId" === e.target.name) {
      changes["opId"] = getOperatorIds(e.target.value)[0];
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
  return (
    <div>
      <select name="keyId" value={keyId} onChange={handleChange}>
        {keyOptions}
      </select>
      <select name="opId" value={opId} onChange={handleChange}>
        {getOperatorOptions(keyId)}
      </select>
      <input name="value" value={value} onChange={handleChange} />
    </div>
  );
}
