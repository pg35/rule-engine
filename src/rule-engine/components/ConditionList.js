import Condition from "./Condition";

export default function ConditionList(props) {
  const { conditions, onConditionChange, ...otherProps } = props;
  return conditions.map((obj) => (
    <Condition
      key={obj.id}
      condition={obj}
      onChange={onConditionChange}
      {...otherProps}
    />
  ));
}
