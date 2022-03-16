import ConditionList from "./ConditionList";
import Collapsible from "./ui/Collapsible";

export default function Rule(props) {
  const { rule, fieldsComponent, ...otherProps } = props;
  const { id, fields, criteria } = rule;

  const FieldsComponent = fieldsComponent;
  return (
    <div>
      <FieldsComponent fields={fields} ruleId={id} {...otherProps} />
      {criteria.map((conditions, index) => (
        <Collapsible
          title={props.config.criteria[index].label}
          key={`${id}-${index}`}
        >
          <ConditionList
            conditions={conditions}
            condListIndex={index}
            ruleId={id}
            {...otherProps}
          />
        </Collapsible>
      ))}
    </div>
  );
}
