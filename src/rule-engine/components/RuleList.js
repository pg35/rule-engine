import Rule from "./Rule";
import Collapsible from "./ui/Collapsible";

export default function RuleList(props) {
  const { id, rules, ...otherProps } = props;
  const { config, dispatch } = props;

  return (
    <div className={`objlist rulelist rulelist-${config.label}`}>
      <div className="rulelist__header">
        <h2 className="rulelist__title">{config.label} rules</h2>
      </div>
      <div className="objlist__content">
        {!rules.length ? (
          <div className="objlist__empty">No rules configured.</div>
        ) : (
          rules.map((rule) => (
            <Collapsible
              key={rule.id}
              className={`rule rule-${rule.id} ${
                rule.active ? "rule--active" : ""
              }`}
              headerContent={
                <>
                  <span className="icon sort-handle">
                    <i className="dashicons dashicons-menu"></i>
                  </span>
                  <span className="rule__title">{rule.name}</span>
                  <span className="rule__header-btns">
                    <button
                      title="Duplicate"
                      className="icon rule-btn-duplicate"
                      onClick={(e) => {
                        dispatch({
                          type: "DUPLICATE_RULE",
                          ruleListId: id,
                          ruleId: rule.id
                        });
                        e.stopPropagation();
                      }}
                    >
                      <i className="dashicons dashicons-admin-page"></i>
                    </button>
                    <button
                      title="Delete"
                      className="icon btn-remove rule-btn-remove"
                      onClick={(e) =>
                        dispatch({
                          type: "REMOVE_RULE",
                          ruleListId: id,
                          ruleId: rule.id
                        })
                      }
                    >
                      <i className="dashicons dashicons-no-alt"></i>
                    </button>
                  </span>
                </>
              }
            >
              <Rule rule={rule} ruleListId={id} {...otherProps} />
            </Collapsible>
          ))
        )}
        <div className="objlist__add">
          <button
            className="button"
            onClick={(e) =>
              dispatch({
                type: "ADD_RULE",
                ruleListId: id
              })
            }
          >
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
}
