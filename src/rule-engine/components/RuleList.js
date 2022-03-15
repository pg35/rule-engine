import Rule from "./Rule";

export default function RuleList(props) {
  const { screenId, rules, dispatch, ...otherProps } = props;

  return (
    <div>
      <h3>{props.screenId} rules</h3>
      <div>
        <button
          onClick={(e) =>
            dispatch({
              type: "ADD_RULE",
              screenId
            })
          }
        >
          Add Rule
        </button>
        {rules.map((rule) => (
          <div key={rule.id}>
            <Rule
              rule={rule}
              screenId={screenId}
              dispatch={dispatch}
              {...otherProps}
            />
            <button
              onClick={(e) =>
                dispatch({
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
