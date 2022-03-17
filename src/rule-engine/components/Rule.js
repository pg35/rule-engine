import ConditionList from "./ConditionList";
import Field from "./ui/Field";
import Collapsible from "./ui/Collapsible";

import { getHtmlId, getFieldValue, cn } from "../util.js";
import st from "./css/common.module.css";

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
      <div>
        <div className={st.md6}>
          <Field {...getFieldProps("name", name)} />
        </div>
        <div className={st.md3}>
          <Field
            {...getFieldProps("active", active, "checkbox", "horizontal")}
          />
        </div>
        <div className={st.md3}>
          <Field
            {...getFieldProps("priority", priority, "number", "horizontal")}
          />
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
