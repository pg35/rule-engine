import Condition from "./Condition";

export default function ConditionList(props) {
  const { conditions, ...otherProps } = props;
  const { ruleListId, ruleId, condListIndex, config } = props;

  return (
    <div>
      <h4>{config.criteria[condListIndex].label}</h4>
      {conditions.map((obj) => (
        <div key={obj.id}>
          <Condition condition={obj} {...otherProps} />
          <button
            onClick={(e) =>
              props.dispatch({
                type: "REMOVE_CONDITION",
                ruleListId,
                ruleId,
                condListIndex,
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
            ruleListId,
            ruleId,
            condListIndex
          })
        }
      >
        Add Condition
      </button>
    </div>
  );
}
