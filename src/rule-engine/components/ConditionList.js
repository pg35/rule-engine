import Condition from "./Condition";

export default function ConditionList(props) {
  const { conditions, ...otherProps } = props;
  const { ruleListId, ruleId, condListIndex, config } = props;

  return (
    <div className="objlist conditionlist">
      <div className="objlist__content">
        {!conditions.length ? (
          <div className="objlist__empty">
            {config.criteria[condListIndex].labels.empty}
          </div>
        ) : (
          conditions.map((obj) => (
            <Condition key={obj.id} condition={obj} {...otherProps} />
          ))
        )}

        <div className="objlist__add">
          <button
            className="button button-secondary"
            onClick={(e) =>
              props.dispatch({
                type: "ADD_CONDITION",
                ruleListId,
                ruleId,
                condListIndex
              })
            }
          >
            {config.criteria[condListIndex].labels.addNew}
          </button>
        </div>
      </div>
    </div>
  );
}
