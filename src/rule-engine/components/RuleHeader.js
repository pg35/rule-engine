export default function RuleHeader(props) {
  const { ruleListId, rule, dispatch } = props;
  return (
    <div>
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
              ruleListId,
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
              ruleListId,
              ruleId: rule.id
            })
          }
        >
          <i className="dashicons dashicons-no-alt"></i>
        </button>
      </span>
    </div>
  );
}
