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
        [action.ruleListId]: state[action.ruleListId].concat(
          createRule(nextId)
        ),
        nextId
      };
    case "REMOVE_RULE":
      return {
        ...state,
        [action.ruleListId]: state[action.ruleListId].filter(
          (rule) => action.ruleId !== rule.id
        )
      };
    case "UPDATE_RULE":
      return {
        ...state,
        [action.ruleListId]: state[action.ruleListId].map((rule) =>
          action.ruleId === rule.id ? { ...rule, ...action.field } : rule
        )
      };
    case "ADD_CONDITION":
      nextId = state.nextId + 1;
      return {
        ...state,
        [action.ruleListId]: state[action.ruleListId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.condListIndex === idx
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
        [action.ruleListId]: state[action.ruleListId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.condListIndex === idx
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
        [action.ruleListId]: state[action.ruleListId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                criteria: rule.criteria.map((list, idx) =>
                  action.condListIndex === idx
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
        [action.ruleListId]: state[action.ruleListId].map((rule) =>
          action.ruleId === rule.id
            ? {
                ...rule,
                fields: { ...rule.fields, ...action.field }
              }
            : rule
        )
      };
    default:
      throw new Error("RuleEngine::reducer - Invalid action " + action.type);
  }
}
