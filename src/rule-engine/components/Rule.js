import ConditionList from "./ConditionList";

export default function Rule(props) {
  const { rule, fieldsComponent, ...otherProps } = props;
  const { id, fields, criteria } = rule;
  const FieldsComponent = fieldsComponent;
  return (
    <div>
      <FieldsComponent fields={fields} ruleId={id} {...otherProps} />
      {criteria.map((conditions, index) => (
        <ConditionList
          key={`${id}-${index}`}
          conditions={conditions}
          ruleId={id}
          listIndex={index}
          {...otherProps}
        />
      ))}
    </div>
  );
}
