import Condition from "./Condition";
import { getListLabel } from "../util";

export default function ConditionList(props) {
  const { screenId, ruleId, listIndex } = props;
  const { conditions, onConditionChange, ...otherProps } = props;

  return (
    <div>
      <h4>{getListLabel(props.screenConfig, screenId, listIndex)}</h4>
      {conditions.map((obj) => (
        <div key={obj.id}>
          <Condition
            condition={obj}
            onChange={onConditionChange}
            {...otherProps}
          />
          <button
            onClick={(e) =>
              props.removeCondition(screenId, ruleId, listIndex, obj.id)
            }
          >
            {" "}
            X{" "}
          </button>
        </div>
      ))}
      <button onClick={(e) => props.addCondition(screenId, ruleId, listIndex)}>
        Add Condition
      </button>
    </div>
  );
}
