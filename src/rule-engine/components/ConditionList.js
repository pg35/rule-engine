import Condition from "./Condition";
import styles from "./css/ConditionList.module.css";

export default function ConditionList(props) {
  const { conditions, ...otherProps } = props;
  const { ruleListId, ruleId, condListIndex, config } = props;

  return (
    <div className={styles.conditionList}>
      {conditions.map((obj) => (
        <Condition key={obj.id} condition={obj} {...otherProps} />
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
