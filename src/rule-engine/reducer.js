function createRule(id) {
  return { id, props: {}, criteria: [[], []] };
}
function createCondition(id) {
  return { id, keyId: 2, opId: 3, value: "" };
}

export function reducer(state, action) {
  let nextId;
  switch (action.type) {
    case "ADD_RULE":
      nextId = state.nextId + 1;
      return {
        ...state,
        [action.screenId]: state[action.screenId].concat(createRule(nextId)),
        nextId
      };
    case "REMOVE_RULE":
      return {
        ...state,
        [action.screenId]: state[action.screenId].filter(
          (rule) => action.ruleId !== rule.id
        )
      };
    case "ADD_CONDITION":
      nextId = state.nextId + 1;
      return {
        ...state,
        [action.screenId]: state[action.screenId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.listIndex === idx
                    ? list.concat(createCondition(nextId))
                    : list
                )
              }
            : rule
        ),
        nextId
      };
    case "REMOVE_CONDITION":
      return {
        ...state,
        [action.screenId]: state[action.screenId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.listIndex === idx
                    ? list.filter((obj) => action.conditionId !== obj.id)
                    : list
                )
              }
            : rule
        )
      };
    case "UPDATE_CONDITION":
      return {
        ...state,
        [action.screenId]: state[action.screenId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.listIndex === idx
                    ? list.map((obj) =>
                        action.condition.id === obj.id
                          ? { ...obj, ...action.condition }
                          : obj
                      )
                    : list
                )
              }
            : rule
        )
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.screenId]: state[action.screenId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                fields: rule.fields.map((obj) =>
                  action.field.id === obj.id ? { ...obj, ...action.field } : obj
                )
              }
            : rule
        )
      };
    default:
      throw new Error("RuleEngine::reducer - Invalid action " + action.type);
  }
}
