import Rule from "./Rule";

export default function RuleList(props) {
  const { screenId, rules, ...otherProps } = props;
  return (
    <div>
      <h3>{props.screenId} rules</h3>
      <div>
        <button
          onClick={(e) =>
            props.dispatch({
              type: "ADD_RULE",
              screenId
            })
          }
        >
          Add Rule
        </button>
        {rules.map((rule) => (
          <div key={rule.id}>
            <Rule rule={rule} screenId={screenId} {...otherProps} />
            <button
              onClick={(e) =>
                props.dispatch({
                  type: "REMOVE_RULE",
                  screenId,
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
