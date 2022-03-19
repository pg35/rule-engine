import { reducer as ruleEngineReducer } from "./rule-engine/reducer";

export function reducer(state, action) {
  console.log(state, action);
  if (0 === action.type.indexOf("RE_"))
    return {
      ...state,
      rules: ruleEngineReducer(state.rules, {
        ...action,
        type: action.type.substr(3)
      })
    };
  switch (action.type) {
    case "INIT":
      return {
        ...action.state,
        init: true
      };
    case "FETCHING":
      return {
        ...state,
        fetching: action.fetching
      };

    default:
      throw new Error("Store: Invalid action" + action.type);
  }
}
