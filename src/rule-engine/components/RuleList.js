import Rule from "./Rule";

export default function RuleList(props) {
  const { id, rules, ...otherProps } = props;
  const { config, dispatch } = props;

  return (
    <div>
      <h3>{config.label} rules</h3>
      <div>
        <button
          onClick={(e) =>
            dispatch({
              type: "ADD_RULE",
              ruleListId: id
            })
          }
        >
          Add Rule
        </button>
        {rules.map((rule) => (
          <div key={rule.id}>
            <Rule rule={rule} ruleListId={id} {...otherProps} />
            <button
              onClick={(e) =>
                dispatch({
                  type: "REMOVE_RULE",
                  ruleListId: id,
                  ruleId: rule.id
                })
              }
            >
              Remove Rule
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
