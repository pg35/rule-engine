import ConditionList from "./ConditionList";
import Collapsible from "./ui/Collapsible";
import { getHtmlId, getFieldValue, cn } from "../util.js";
import st from "./css/common.module.css";

export default function Rule(props) {
  const { rule, fieldsComponent, ...otherProps } = props;
  const { id, name, active, priority, fields, criteria } = rule;

  const FieldsComponent = fieldsComponent;
  const handleChange = (e) => {
    const rule = { [e.target.name]: getFieldValue(e) };
    props.dispatch({
      type: "UPDATE_RULE",
      ruleListId: props.ruleListId,
      ruleId: id,
      rule
    });
  };
  const getFieldProps = (name, value) => ({
    name,
    id: getHtmlId(name),
    value,
    onChange: handleChange
  });
  return (
    <div>
      <div>
        <div className={cn([st.md, st.md6])}>
          <div className={st.field}>
            <label htmlFor={getHtmlId(`rule${id}-name`)}>Name</label>
            <input type="text" {...getFieldProps("name", name)} />
          </div>
        </div>
        <div className={cn([st.md, st.md3])}>
          <div className={cn([st.field, st.inlineContent])}>
            <label htmlFor={getHtmlId(`rule${id}-active`)}>Active</label>
            <input
              type="checkbox"
              {...getFieldProps("active", "1")}
              checked={active}
            />
          </div>
        </div>
        <div className={cn([st.md, st.md3])}>
          <div className={cn([st.field, st.inlineContent])}>
            <label htmlFor={getHtmlId(`rule${id}-priority`)}>priority</label>
            <input type="number" {...getFieldProps("priority", priority)} />
          </div>
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
