import ConditionList from "./ConditionList";

export default function Rule(props) {
  const {
    rule,
    onFieldChange,
    onConditionChange,
    fieldsComponent,
    ...otherProps
  } = props;
  const { id, fields, criteria } = rule;
  const FieldsComponent = fieldsComponent;

  return (
    <div>
      <FieldsComponent
        fields={fields}
        onChange={onFieldChange}
        ruleId={id}
        {...otherProps}
      />
      {criteria.map((conditions, index) => (
        <ConditionList
          key={`${id}-${index}`}
          conditions={conditions}
          onChange={onConditionChange}
          ruleId={id}
          {...otherProps}
        />
      ))}
    </div>
  );
}
