import ConditionList from "./ConditionList";
import Field from "./ui/Field";
import Collapsible from "./ui/Collapsible";

export default function Rule(props) {
  const { rule, fieldsComponent, ...otherProps } = props;
  const { id, name, active, priority, fields, criteria } = rule;

  const FieldsComponent = fieldsComponent;

  const getFieldProps = (name, value, type, layout) => ({
    field: {
      name,
      value,
      type,
      id: `rule${id}-${name}`,
      layout
    },
    action: {
      type: "UPDATE_RULE",
      ruleListId: props.ruleListId,
      ruleId: id
    },
    dispatch: props.dispatch,
    key: "rule" + name
  });
  console.log("rule", props);
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Field {...getFieldProps("name", name, "text")} />
        </div>
        <div className="col-md-3">
          <Field {...getFieldProps("active", active, "checkbox")} />
        </div>
        <div className="col-md-3">
          <Field {...getFieldProps("priority", priority, "number", "inline")} />
        </div>
      </div>
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
