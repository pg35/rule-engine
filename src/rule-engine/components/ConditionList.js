import Condition from "./Condition";
import { getListLabel } from "../util";

export default function ConditionList(props) {
  const { screenId, ruleId, listIndex } = props;
  const { conditions, ...otherProps } = props;

  return (
    <div>
      <h4>{getListLabel(props.screenConfig, screenId, listIndex)}</h4>
      {conditions.map((obj) => (
        <div key={obj.id}>
          <Condition condition={obj} {...otherProps} />
          <button
            onClick={(e) =>
              props.dispatch({
                type: "REMOVE_CONDITION",
                screenId,
                ruleId,
                listIndex,
                conditionId: obj.id
              })
            }
          >
            {" "}
            X{" "}
          </button>
        </div>
      ))}
      <button
        onClick={(e) =>
          props.dispatch({
            type: "ADD_CONDITION",
            screenId,
            ruleId,
            listIndex
          })
        }
      >
        Add Condition
      </button>
    </div>
  );
}
